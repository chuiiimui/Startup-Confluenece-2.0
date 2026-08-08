import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Rocket,
  Handshake,
  Mic,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useRegistration } from '../context/RegistrationContext';
import { getLenisInstance } from '../lib/utils';

function getSavedFormData<T>(key: string): Partial<T> {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return {};
    const parsed = JSON.parse(saved) as Record<string, unknown>;
    // Never persist large base64 pitch decks in localStorage
    delete parsed.pitchDeckBase64;
    delete parsed.pitchDeckFileName;
    delete parsed.pitchDeckMimeType;
    return parsed as Partial<T>;
  } catch {
    return {};
  }
}

const PITCH_DECK_MAX_BYTES = 3.5 * 1024 * 1024; // ~3.5MB (base64 expands ~33%)
const PITCH_DECK_ACCEPT =
  '.pdf,.ppt,.pptx,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation';

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || '');
      const base64 = result.includes(',') ? result.split(',')[1] : result;
      resolve(base64 || '');
    };
    reader.onerror = () => reject(new Error('Could not read pitch deck file'));
    reader.readAsDataURL(file);
  });
}

// Prefer VITE_GOOGLE_SCRIPT_URL from .env — see docs/EMAIL_SETUP.md
const GOOGLE_SCRIPT_URL =
  (import.meta.env.VITE_GOOGLE_SCRIPT_URL as string | undefined)?.trim() ||
  'https://script.google.com/macros/s/AKfycbx3KEix1mtaKzco5pj-8ut-VjChYhanuxUt_JPxHPbHPq0d6VZBT5PvhVm7o6qjrqAZ2g/exec';

type RegistrationType = 'startup' | 'sponsor' | 'speaker';

interface StartupFormData {
  startupName: string;
  founderName: string;
  email: string;
  phone: string;
  website: string;
  startupStage: string;
  industry: string;
  description: string;
  teamSize: number;
  needStall: string;
  fundingGrant: string;
  wantPitch: string;
  pitchDeckUrl?: string;
  pitchDeckFileName?: string;
  pitchDeckMimeType?: string;
  pitchDeckBase64?: string;
  linkedin: string;
}

interface SponsorFormData {
  orgName: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  sponsorshipCategory: string;
  companyDescription: string;
  expectedContribution: string;
  additionalNotes: string;
}

interface SpeakerFormData {
  fullName: string;
  organization: string;
  designation: string;
  email: string;
  phone: string;
  linkedin: string;
  speakerBio: string;
  expertise: string;
  topicProposal: string;
  previousExperience: string;
  personalWebsite: string;
}

const CONFETTI_COLORS = ['#FF7A1A', '#0A2E6D', '#16B8CC', '#22C55E', '#FFD700'];

const categories: {
  type: RegistrationType;
  icon: React.ElementType;
  emoji: string;
  title: string;
  subtitle: string;
}[] = [
  {
    type: 'startup',
    icon: Rocket,
    emoji: '🚀',
    title: 'Startup',
    subtitle: 'Register your venture',
  },
  {
    type: 'sponsor',
    icon: Handshake,
    emoji: '🤝',
    title: 'Sponsor',
    subtitle: 'Partner with us',
  },
  {
    type: 'speaker',
    icon: Mic,
    emoji: '🎤',
    title: 'Speaker',
    subtitle: 'Share your expertise',
  },
];

const inputClass = 'form-glass-input font-body';
const inputErrorClass = 'form-glass-input form-glass-input-error font-body';
const labelClass = 'form-glass-label font-body';
const errorTextClass = 'text-xs text-red-300 mt-1 font-body';

function scrollFormToFirstError() {
  requestAnimationFrame(() => {
    document
      .querySelector('.registration-form-scroll .form-glass-input-error')
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

function FieldWrapper({ children }: { children: React.ReactNode }) {
  return <div className="space-y-0">{children}</div>;
}

/* ─── Confetti ─────────────────────────────────────────────── */
function Confetti() {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      size: Math.random() > 0.5 ? 8 : 12,
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 400,
      rotation: Math.random() * 720 - 360,
      delay: Math.random() * 0.3,
    }));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
          animate={{
            x: p.x,
            y: p.y,
            opacity: 0,
            scale: 1,
            rotate: p.rotation,
          }}
          transition={{
            duration: 1.2,
            delay: p.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

/* ─── Startup Form ─────────────────────────────────────────── */
function StartupForm({
  onSubmit,
  isSubmitting,
}: {
  onSubmit: (data: StartupFormData) => void;
  isSubmitting: boolean;
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<StartupFormData>({
    defaultValues: {
      fundingGrant: '',
      wantPitch: '',
      ...getSavedFormData<StartupFormData>('startupFormAutoSave'),
    },
    shouldFocusError: true,
  });

  const wantPitch = watch('wantPitch');
  const pitchDeckFileName = watch('pitchDeckFileName');

  useEffect(() => {
    const subscription = watch((value) => {
      const {
        pitchDeckBase64: _b64,
        pitchDeckFileName: _name,
        pitchDeckMimeType: _mime,
        ...rest
      } = value;
      localStorage.setItem('startupFormAutoSave', JSON.stringify(rest));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (wantPitch !== 'Yes') {
      setValue('pitchDeckUrl', '');
      setValue('pitchDeckFileName', '');
      setValue('pitchDeckMimeType', '');
      setValue('pitchDeckBase64', '');
      clearErrors(['pitchDeckUrl', 'pitchDeckFileName']);
    }
  }, [wantPitch, setValue, clearErrors]);

  const handlePitchDeckChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    clearErrors(['pitchDeckFileName', 'pitchDeckUrl']);

    if (!file) {
      setValue('pitchDeckFileName', '');
      setValue('pitchDeckMimeType', '');
      setValue('pitchDeckBase64', '');
      return;
    }

    if (file.size > PITCH_DECK_MAX_BYTES) {
      setError('pitchDeckFileName', {
        type: 'manual',
        message: 'Pitch deck must be under 3.5 MB. Upload a smaller file or paste a Drive/URL link instead.',
      });
      e.target.value = '';
      setValue('pitchDeckFileName', '');
      setValue('pitchDeckMimeType', '');
      setValue('pitchDeckBase64', '');
      return;
    }

    try {
      const base64 = await readFileAsBase64(file);
      setValue('pitchDeckFileName', file.name, { shouldValidate: true });
      setValue('pitchDeckMimeType', file.type || 'application/octet-stream');
      setValue('pitchDeckBase64', base64);
    } catch {
      setError('pitchDeckFileName', {
        type: 'manual',
        message: 'Could not read that file. Try again or use a link instead.',
      });
      e.target.value = '';
    }
  };

  const submitStartup = (data: StartupFormData) => {
    if (data.wantPitch === 'Yes') {
      const hasFile = Boolean(data.pitchDeckBase64 && data.pitchDeckFileName);
      const hasUrl = Boolean(data.pitchDeckUrl?.trim());
      if (!hasFile && !hasUrl) {
        setError('pitchDeckFileName', {
          type: 'manual',
          message: 'Add a pitch deck file or paste a deck URL to continue.',
        });
        scrollFormToFirstError();
        return;
      }
    }
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submitStartup, scrollFormToFirstError)} className="space-y-2.5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        <FieldWrapper>
          <label className={labelClass}>
            Startup Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            className={errors.startupName ? inputErrorClass : inputClass}
            placeholder="Your startup name"
            {...register('startupName', { required: 'Startup name is required' })}
          />
          {errors.startupName && (
            <p className={errorTextClass}>{errors.startupName.message}</p>
          )}
        </FieldWrapper>

        <FieldWrapper>
          <label className={labelClass}>
            Founder Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            className={errors.founderName ? inputErrorClass : inputClass}
            placeholder="Full name"
            {...register('founderName', { required: 'Founder name is required' })}
          />
          {errors.founderName && (
            <p className={errorTextClass}>{errors.founderName.message}</p>
          )}
        </FieldWrapper>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        <FieldWrapper>
          <label className={labelClass}>
            Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            className={errors.email ? inputErrorClass : inputClass}
            placeholder="you@example.com"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && (
            <p className={errorTextClass}>{errors.email.message}</p>
          )}
        </FieldWrapper>

        <FieldWrapper>
          <label className={labelClass}>
            Phone <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            className={errors.phone ? inputErrorClass : inputClass}
            placeholder="+91 XXXXX XXXXX"
            {...register('phone', { required: 'Phone number is required' })}
          />
          {errors.phone && (
            <p className={errorTextClass}>{errors.phone.message}</p>
          )}
        </FieldWrapper>
      </div>

      <FieldWrapper>
        <label className={labelClass}>Website</label>
        <input
          type="url"
          className={inputClass}
          placeholder="https://yourstartup.com"
          {...register('website')}
        />
      </FieldWrapper>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        <FieldWrapper>
          <label className={labelClass}>
            Startup Stage <span className="text-red-400">*</span>
          </label>
          <select
            className={errors.startupStage ? inputErrorClass : inputClass}
            {...register('startupStage', { required: 'Please select a stage' })}
          >
            <option value="">Select stage</option>
            <option value="Idea">Idea</option>
            <option value="MVP">MVP</option>
            <option value="Early Stage">Early Stage</option>
            <option value="Growth">Growth</option>
          </select>
          {errors.startupStage && (
            <p className={errorTextClass}>{errors.startupStage.message}</p>
          )}
        </FieldWrapper>

        <FieldWrapper>
          <label className={labelClass}>
            Industry <span className="text-red-400">*</span>
          </label>
          <select
            className={errors.industry ? inputErrorClass : inputClass}
            {...register('industry', { required: 'Please select an industry' })}
          >
            <option value="">Select industry</option>
            <option value="AI & ML">AI &amp; ML</option>
            <option value="FinTech">FinTech</option>
            <option value="HealthTech">HealthTech</option>
            <option value="AgriTech">AgriTech</option>
            <option value="EdTech">EdTech</option>
            <option value="CleanTech">CleanTech</option>
            <option value="E-Commerce">E-Commerce</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Sustainability">Sustainability</option>
            <option value="Construction Tech">Construction Tech</option>
            <option value="Other">Other</option>
          </select>
          {errors.industry && (
            <p className={errorTextClass}>{errors.industry.message}</p>
          )}
        </FieldWrapper>
      </div>

      <FieldWrapper>
        <label className={labelClass}>
          Description <span className="text-red-400">*</span>
        </label>
        <textarea
          rows={3}
          className={errors.description ? inputErrorClass : inputClass}
          placeholder="Describe your startup in a few lines (max 500 characters)"
          {...register('description', {
            required: 'Description is required',
            maxLength: { value: 500, message: 'Max 500 characters' },
          })}
        />
        {errors.description && (
          <p className={errorTextClass}>{errors.description.message}</p>
        )}
      </FieldWrapper>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        <FieldWrapper>
          <label className={labelClass}>
            Team Size <span className="text-red-400">*</span>
          </label>
          <input
            type="number"
            min={1}
            className={errors.teamSize ? inputErrorClass : inputClass}
            placeholder="e.g. 5"
            {...register('teamSize', {
              required: 'Team size is required',
              valueAsNumber: true,
            })}
          />
          {errors.teamSize && (
            <p className={errorTextClass}>{errors.teamSize.message}</p>
          )}
        </FieldWrapper>

        <FieldWrapper>
          <label className={labelClass}>
            Need Stall? <span className="text-red-400">*</span>
          </label>
          <select
            className={errors.needStall ? inputErrorClass : inputClass}
            {...register('needStall', { required: 'Please select an option' })}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors.needStall && (
            <p className={errorTextClass}>{errors.needStall.message}</p>
          )}
        </FieldWrapper>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        <FieldWrapper>
          <label className={labelClass}>
            Has your startup received any funding?{' '}
            <span className="text-red-400">*</span>
          </label>
          <select
            className={errors.fundingGrant ? inputErrorClass : inputClass}
            {...register('fundingGrant', {
              required: 'Please select whether you have received funding',
            })}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors.fundingGrant && (
            <p className={errorTextClass}>{errors.fundingGrant.message}</p>
          )}
        </FieldWrapper>

        <FieldWrapper>
          <label className={labelClass}>
            Want to Pitch? <span className="text-red-400">*</span>
          </label>
          <select
            className={errors.wantPitch ? inputErrorClass : inputClass}
            {...register('wantPitch', { required: 'Please select an option' })}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors.wantPitch && (
            <p className={errorTextClass}>{errors.wantPitch.message}</p>
          )}
        </FieldWrapper>
      </div>

      {wantPitch === 'Yes' && (
        <div
          className="space-y-2.5 rounded-xl border p-3"
          style={{
            borderColor: 'var(--border-strong)',
            background: 'var(--surface)',
          }}
        >
          <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
            Pitch deck <span className="text-red-400">*</span>
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Upload a PDF/PPT (max 3.5 MB) or paste a Drive / public deck link.
          </p>

          <FieldWrapper>
            <label className={labelClass}>Upload pitch deck</label>
            <input
              type="file"
              accept={PITCH_DECK_ACCEPT}
              className={errors.pitchDeckFileName ? inputErrorClass : inputClass}
              onChange={handlePitchDeckChange}
            />
            {pitchDeckFileName && (
              <p className="mt-1 text-xs" style={{ color: 'var(--badge-text)' }}>
                Selected: {pitchDeckFileName}
              </p>
            )}
            {errors.pitchDeckFileName && (
              <p className={errorTextClass}>{errors.pitchDeckFileName.message}</p>
            )}
          </FieldWrapper>

          <FieldWrapper>
            <label className={labelClass}>Or pitch deck URL</label>
            <input
              type="url"
              className={errors.pitchDeckUrl ? inputErrorClass : inputClass}
              placeholder="https://drive.google.com/... or public deck link"
              {...register('pitchDeckUrl')}
            />
            {errors.pitchDeckUrl && (
              <p className={errorTextClass}>{errors.pitchDeckUrl.message}</p>
            )}
          </FieldWrapper>
        </div>
      )}

      <FieldWrapper>
        <label className={labelClass}>LinkedIn Profile</label>
        <input
          type="url"
          className={inputClass}
          placeholder="https://linkedin.com/in/yourprofile"
          {...register('linkedin')}
        />
      </FieldWrapper>

      <SubmitButton label="Register Startup" isSubmitting={isSubmitting} />
    </form>
  );
}

/* ─── Sponsor Form ─────────────────────────────────────────── */
function SponsorForm({
  onSubmit,
  isSubmitting,
}: {
  onSubmit: (data: SponsorFormData) => void;
  isSubmitting: boolean;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SponsorFormData>({
    defaultValues: getSavedFormData<SponsorFormData>('sponsorFormAutoSave'),
    shouldFocusError: true,
  });

  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem('sponsorFormAutoSave', JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form onSubmit={handleSubmit(onSubmit, scrollFormToFirstError)} className="space-y-2.5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        <FieldWrapper>
          <label className={labelClass}>
            Organization Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            className={errors.orgName ? inputErrorClass : inputClass}
            placeholder="Company / Organization"
            {...register('orgName', { required: 'Organization name is required' })}
          />
          {errors.orgName && (
            <p className={errorTextClass}>{errors.orgName.message}</p>
          )}
        </FieldWrapper>

        <FieldWrapper>
          <label className={labelClass}>
            Contact Person <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            className={errors.contactPerson ? inputErrorClass : inputClass}
            placeholder="Full name"
            {...register('contactPerson', {
              required: 'Contact person is required',
            })}
          />
          {errors.contactPerson && (
            <p className={errorTextClass}>{errors.contactPerson.message}</p>
          )}
        </FieldWrapper>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        <FieldWrapper>
          <label className={labelClass}>
            Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            className={errors.email ? inputErrorClass : inputClass}
            placeholder="contact@company.com"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && (
            <p className={errorTextClass}>{errors.email.message}</p>
          )}
        </FieldWrapper>

        <FieldWrapper>
          <label className={labelClass}>
            Phone <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            className={errors.phone ? inputErrorClass : inputClass}
            placeholder="+91 XXXXX XXXXX"
            {...register('phone', { required: 'Phone number is required' })}
          />
          {errors.phone && (
            <p className={errorTextClass}>{errors.phone.message}</p>
          )}
        </FieldWrapper>
      </div>

      <FieldWrapper>
        <label className={labelClass}>Website</label>
        <input
          type="url"
          className={inputClass}
          placeholder="https://yourcompany.com"
          {...register('website')}
        />
      </FieldWrapper>

      <FieldWrapper>
        <label className={labelClass}>
          Sponsorship Category <span className="text-red-400">*</span>
        </label>
        <select
          className={errors.sponsorshipCategory ? inputErrorClass : inputClass}
          {...register('sponsorshipCategory', {
            required: 'Please select a category',
          })}
        >
          <option value="">Select category</option>
          <option value="Incubation & Technology Partners">Incubation & Technology Partners</option>
          <option value="Media & Ecosystem Partners">Media & Ecosystem Partners</option>
          <option value="Community Partners">Community Partners</option>
        </select>
        {errors.sponsorshipCategory && (
          <p className={errorTextClass}>{errors.sponsorshipCategory.message}</p>
        )}
      </FieldWrapper>

      <FieldWrapper>
        <label className={labelClass}>
          Company Description <span className="text-red-400">*</span>
        </label>
        <textarea
          rows={3}
          className={errors.companyDescription ? inputErrorClass : inputClass}
          placeholder="Brief description of your company"
          {...register('companyDescription', {
            required: 'Company description is required',
          })}
        />
        {errors.companyDescription && (
          <p className={errorTextClass}>{errors.companyDescription.message}</p>
        )}
      </FieldWrapper>

      <FieldWrapper>
        <label className={labelClass}>Expected Contribution</label>
        <input
          type="text"
          className={inputClass}
          placeholder="e.g. ₹1,00,000"
          {...register('expectedContribution')}
        />
      </FieldWrapper>

      <FieldWrapper>
        <label className={labelClass}>Additional Notes</label>
        <textarea
          rows={2}
          className={inputClass}
          placeholder="Any specific requirements or notes"
          {...register('additionalNotes')}
        />
      </FieldWrapper>

      <SubmitButton label="Become a Sponsor" isSubmitting={isSubmitting} />
    </form>
  );
}

/* ─── Speaker Form ─────────────────────────────────────────── */
function SpeakerForm({
  onSubmit,
  isSubmitting,
}: {
  onSubmit: (data: SpeakerFormData) => void;
  isSubmitting: boolean;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SpeakerFormData>({
    defaultValues: getSavedFormData<SpeakerFormData>('speakerFormAutoSave'),
    shouldFocusError: true,
  });

  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem('speakerFormAutoSave', JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form onSubmit={handleSubmit(onSubmit, scrollFormToFirstError)} className="space-y-2.5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        <FieldWrapper>
          <label className={labelClass}>
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            className={errors.fullName ? inputErrorClass : inputClass}
            placeholder="Your full name"
            {...register('fullName', { required: 'Full name is required' })}
          />
          {errors.fullName && (
            <p className={errorTextClass}>{errors.fullName.message}</p>
          )}
        </FieldWrapper>

        <FieldWrapper>
          <label className={labelClass}>
            Organization <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            className={errors.organization ? inputErrorClass : inputClass}
            placeholder="Company / University"
            {...register('organization', {
              required: 'Organization is required',
            })}
          />
          {errors.organization && (
            <p className={errorTextClass}>{errors.organization.message}</p>
          )}
        </FieldWrapper>
      </div>

      <FieldWrapper>
        <label className={labelClass}>
          Designation <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          className={errors.designation ? inputErrorClass : inputClass}
          placeholder="e.g. CTO, Professor, Lead Engineer"
          {...register('designation', { required: 'Designation is required' })}
        />
        {errors.designation && (
          <p className={errorTextClass}>{errors.designation.message}</p>
        )}
      </FieldWrapper>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        <FieldWrapper>
          <label className={labelClass}>
            Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            className={errors.email ? inputErrorClass : inputClass}
            placeholder="you@example.com"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && (
            <p className={errorTextClass}>{errors.email.message}</p>
          )}
        </FieldWrapper>

        <FieldWrapper>
          <label className={labelClass}>
            Phone <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            className={errors.phone ? inputErrorClass : inputClass}
            placeholder="+91 XXXXX XXXXX"
            {...register('phone', { required: 'Phone number is required' })}
          />
          {errors.phone && (
            <p className={errorTextClass}>{errors.phone.message}</p>
          )}
        </FieldWrapper>
      </div>

      <FieldWrapper>
        <label className={labelClass}>LinkedIn Profile</label>
        <input
          type="url"
          className={inputClass}
          placeholder="https://linkedin.com/in/yourprofile"
          {...register('linkedin')}
        />
      </FieldWrapper>

      <FieldWrapper>
        <label className={labelClass}>
          Speaker Bio <span className="text-red-400">*</span>
        </label>
        <textarea
          rows={3}
          className={errors.speakerBio ? inputErrorClass : inputClass}
          placeholder="A brief bio highlighting your background"
          {...register('speakerBio', { required: 'Speaker bio is required' })}
        />
        {errors.speakerBio && (
          <p className={errorTextClass}>{errors.speakerBio.message}</p>
        )}
      </FieldWrapper>

      <FieldWrapper>
        <label className={labelClass}>
          Area of Expertise <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          className={errors.expertise ? inputErrorClass : inputClass}
          placeholder="e.g. AI, Product Management, Web3"
          {...register('expertise', { required: 'Expertise is required' })}
        />
        {errors.expertise && (
          <p className={errorTextClass}>{errors.expertise.message}</p>
        )}
      </FieldWrapper>

      <FieldWrapper>
        <label className={labelClass}>
          Topic Proposal <span className="text-red-400">*</span>
        </label>
        <textarea
          rows={3}
          className={errors.topicProposal ? inputErrorClass : inputClass}
          placeholder="What would you like to speak about?"
          {...register('topicProposal', {
            required: 'Topic proposal is required',
          })}
        />
        {errors.topicProposal && (
          <p className={errorTextClass}>{errors.topicProposal.message}</p>
        )}
      </FieldWrapper>

      <FieldWrapper>
        <label className={labelClass}>Previous Speaking Experience</label>
        <textarea
          rows={2}
          className={inputClass}
          placeholder="List any conferences, webinars, or events"
          {...register('previousExperience')}
        />
      </FieldWrapper>

      <FieldWrapper>
        <label className={labelClass}>Personal Website</label>
        <input
          type="url"
          className={inputClass}
          placeholder="https://yourwebsite.com"
          {...register('personalWebsite')}
        />
      </FieldWrapper>

      <SubmitButton label="Apply as Speaker" isSubmitting={isSubmitting} />
    </form>
  );
}

/* ─── Submit Button ────────────────────────────────────────── */
function SubmitButton({
  label,
  isSubmitting,
}: {
  label: string;
  isSubmitting: boolean;
}) {
  return (
    <motion.button
      type="submit"
      disabled={isSubmitting}
      className="mt-2 w-full rounded-2xl bg-accent py-4 text-base font-bold text-white font-heading shadow-lg shadow-[0_12px_32px_rgba(255,122,0,0.28)] transition-colors disabled:cursor-not-allowed disabled:opacity-50"
      whileHover={isSubmitting ? {} : { scale: 1.02 }}
      whileTap={isSubmitting ? {} : { scale: 0.98 }}
    >
      {isSubmitting ? (
        <span className="inline-flex items-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin" />
          Submitting…
        </span>
      ) : (
        label
      )}
    </motion.button>
  );
}

/* ─── Main Modal ───────────────────────────────────────────── */
export const RegistrationModal: React.FC = () => {
  const { isOpen, registrationType, closeModal } = useRegistration();
  const [selectedType, setSelectedType] = useState<RegistrationType>('startup');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sync external registrationType to internal selection
  useEffect(() => {
    if (registrationType) {
      setSelectedType(registrationType as RegistrationType);
    }
  }, [registrationType]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setSubmitError(null);
      setIsSubmitting(false);
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({ top: 0 });
      });
    }
  }, [isOpen]);

  // Keep form scrolled to top when switching registration type
  useEffect(() => {
    if (!isOpen) return;
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedType, isOpen]);

  // ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeModal]);

  // Body scroll lock + pause Lenis so the form scrolls natively
  useEffect(() => {
    const lenis = getLenisInstance();
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = '';
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      getLenisInstance()?.start();
    };
  }, [isOpen]);

  // Progress
  const progress = isSuccess ? 100 : 66;

  // Dismiss error toast
  useEffect(() => {
    if (submitError) {
      const timer = setTimeout(() => setSubmitError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitError]);

  const clearFormDrafts = () => {
    localStorage.removeItem('startupFormAutoSave');
    localStorage.removeItem('sponsorFormAutoSave');
    localStorage.removeItem('speakerFormAutoSave');
  };

  const handleFormSubmit = useCallback(
    async (data: StartupFormData | SponsorFormData | SpeakerFormData) => {
      setIsSubmitting(true);
      setSubmitError(null);

      if (!GOOGLE_SCRIPT_URL) {
        setSubmitError(
          'Registration endpoint is not configured. Set VITE_GOOGLE_SCRIPT_URL.'
        );
        setIsSubmitting(false);
        return;
      }

      const payload = {
        registrationType: selectedType,
        ...data,
        // Remap field names to match Google Apps Script
        ...(selectedType === 'startup' && {
          linkedIn: (data as StartupFormData).linkedin,
          fundingGrant: (data as StartupFormData).fundingGrant,
          pitchDeckUrl: (data as StartupFormData).pitchDeckUrl || '',
          pitchDeckFileName: (data as StartupFormData).pitchDeckFileName || '',
          pitchDeckMimeType: (data as StartupFormData).pitchDeckMimeType || '',
          pitchDeckBase64: (data as StartupFormData).pitchDeckBase64 || '',
        }),
        ...(selectedType === 'sponsor' && { organizationName: (data as SponsorFormData).orgName }),
        ...(selectedType === 'speaker' && {
          linkedIn: (data as SpeakerFormData).linkedin,
          areaOfExpertise: (data as SpeakerFormData).expertise,
          previousSpeakingExperience: (data as SpeakerFormData).previousExperience,
        }),
        timestamp: new Date().toISOString(),
      };

      try {
        // text/plain avoids a CORS preflight; Apps Script still parses JSON body
        const response = await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
          redirect: 'follow',
        });

        if (response.ok) {
          let result: { ok?: boolean; error?: string } = { ok: true };
          try {
            result = (await response.json()) as {
              ok?: boolean;
              error?: string;
            };
          } catch {
            // Non-JSON 200 body — treat as success
          }
          if (result.ok === false) {
            throw new Error(result.error || 'Submission failed');
          }
          setIsSuccess(true);
          clearFormDrafts();
          return;
        }

        throw new Error(`Server returned ${response.status}`);
      } catch (err) {
        const detail =
          err instanceof Error && err.message
            ? err.message
            : 'Please try again or contact us directly.';
        setSubmitError(
          detail.includes('spreadsheet') || detail.includes('Sheet')
            ? 'Sheet connection failed. Fix SPREADSHEET_ID in Apps Script (use ID only, not full URL), then redeploy.'
            : `Something went wrong. ${detail}`
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [selectedType]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center px-0 pt-[6.5rem] pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:items-center sm:px-4 sm:pt-24 sm:pb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 backdrop-blur-xl"
            style={{ background: 'var(--overlay-bg)' }}
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal — shorter so header/X clear the floating nav */}
          <motion.div
            className="form-glass-panel relative z-10 flex max-h-[min(calc(100dvh-7.5rem),680px)] w-full max-w-3xl flex-col overflow-hidden rounded-t-[28px] sm:max-h-[min(calc(100dvh-8rem),700px)] sm:rounded-[32px]"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 30, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="registration-modal-title"
          >
            {/* Sticky header */}
            <div
              className="relative z-20 shrink-0 border-b px-6 pb-3 pt-4 backdrop-blur-md"
              style={{
                borderColor: 'var(--border)',
                background: 'var(--bg-alt)',
              }}
            >
              <div
                className="h-1 w-full overflow-hidden rounded-full"
                style={{ background: 'var(--surface)' }}
              >
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-violet-400 to-accent"
                  initial={{ width: '33%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                />
              </div>
              <button
                onClick={closeModal}
                className="absolute right-4 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
                style={{
                  borderColor: 'var(--border)',
                  background: 'var(--surface)',
                  color: 'var(--text-secondary)',
                }}
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable form content */}
            <div
              ref={scrollRef}
              data-lenis-prevent
              className="registration-form-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-4 md:px-10 md:py-6"
            >
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  /* ─── Success State ──────────────────── */
                  <motion.div
                    key="success"
                    className="relative flex min-h-[340px] flex-col items-center justify-center py-12 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Confetti />

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: 'spring',
                        damping: 12,
                        stiffness: 200,
                        delay: 0.15,
                      }}
                    >
                      <CheckCircle2 className="h-20 w-20 text-green-500" />
                    </motion.div>

                    <motion.h2
                      className="mt-6 text-2xl font-bold font-heading md:text-3xl"
                      style={{ color: 'var(--text-primary)' }}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      Registration Successful!
                    </motion.h2>

                    <motion.p
                      className="mt-2 max-w-md font-body"
                      style={{ color: 'var(--text-secondary)' }}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 }}
                    >
                      We&apos;ve received your application. A confirmation email
                      has been sent to the address you provided — please check
                      Inbox and Spam. We&apos;ll be in touch soon.
                    </motion.p>

                    <motion.button
                      onClick={closeModal}
                      className="mt-8 rounded-2xl border px-10 py-3 text-sm font-semibold transition-colors font-heading"
                      style={{
                        borderColor: 'var(--border-strong)',
                        background: 'var(--surface)',
                        color: 'var(--text-primary)',
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Close
                    </motion.button>
                  </motion.div>
                ) : (
                  /* ─── Form State ─────────────────────── */
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Header */}
                    <div className="mb-6 pr-8 text-center">
                      <h2
                        id="registration-modal-title"
                        className="text-2xl font-bold font-heading md:text-3xl"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        Join Startup Confluence 2.0
                      </h2>
                      <p
                        className="mt-1.5 text-sm font-body"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        Choose your registration type and fill in the details
                      </p>
                    </div>

                    {/* Category Cards */}
                    <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {categories.map((cat) => {
                        const isSelected = selectedType === cat.type;
                        const Icon = cat.icon;
                        return (
                          <motion.button
                            key={cat.type}
                            type="button"
                            onClick={() => setSelectedType(cat.type)}
                            className={`form-glass-option flex items-center gap-3 p-4 text-left sm:flex-col sm:items-start sm:text-left ${
                              isSelected ? 'is-selected' : ''
                            }`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                                isSelected ? 'bg-accent/20 text-accent' : ''
                              }`}
                              style={
                                isSelected
                                  ? undefined
                                  : {
                                      background: 'var(--surface)',
                                      color: 'var(--badge-text)',
                                    }
                              }
                            >
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <p
                                className="text-sm font-bold font-heading"
                                style={{
                                  color: isSelected
                                    ? 'var(--text-primary)'
                                    : 'var(--text-secondary)',
                                }}
                              >
                                {cat.title}
                              </p>
                              <p
                                className="text-xs font-body"
                                style={{ color: 'var(--text-muted)' }}
                              >
                                {cat.subtitle}
                              </p>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Dynamic Form */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedType}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.25 }}
                      >
                        {selectedType === 'startup' && (
                          <StartupForm
                            onSubmit={handleFormSubmit}
                            isSubmitting={isSubmitting}
                          />
                        )}
                        {selectedType === 'sponsor' && (
                          <SponsorForm
                            onSubmit={handleFormSubmit}
                            isSubmitting={isSubmitting}
                          />
                        )}
                        {selectedType === 'speaker' && (
                          <SpeakerForm
                            onSubmit={handleFormSubmit}
                            isSubmitting={isSubmitting}
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Error Toast */}
            <AnimatePresence>
              {submitError && (
                <motion.div
                  className="pointer-events-none absolute bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-2xl border border-red-400/40 bg-[#1E1B4B]/90 px-6 py-3 shadow-xl backdrop-blur-xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                >
                  <p className="text-sm font-medium text-red-300 font-body">
                    {submitError}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegistrationModal;
