import React, { useState, useEffect, useMemo, useCallback } from 'react';
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

function getSavedFormData<T>(key: string): Partial<T> {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

// Replace with your deployed Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxqwQZIZhlAJK4z30HBqYvGz62xaiKh_0dgYGkDyOC0zyN1PHTLCHVo4a6F_M7rJv-k/exec';

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
  wantPitch: string;
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

const inputClass =
  'w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-body bg-white/80 outline-none transition-all focus:border-[#FF7A1A] focus:ring-2 focus:ring-[#FF7A1A]/20';
const inputErrorClass =
  'w-full rounded-xl border border-red-400 px-4 py-3 text-sm font-body bg-white/80 outline-none transition-all focus:border-red-500 focus:ring-2 focus:ring-red-400/20';
const labelClass = 'block text-sm font-medium text-gray-600 mb-1.5 font-body';
const errorTextClass = 'text-xs text-red-500 mt-1 font-body';

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
    formState: { errors },
  } = useForm<StartupFormData>({ defaultValues: getSavedFormData<StartupFormData>('startupFormAutoSave') });

  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem('startupFormAutoSave', JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
  } = useForm<SponsorFormData>({ defaultValues: getSavedFormData<SponsorFormData>('sponsorFormAutoSave') });

  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem('sponsorFormAutoSave', JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
  } = useForm<SpeakerFormData>({ defaultValues: getSavedFormData<SpeakerFormData>('speakerFormAutoSave') });

  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem('speakerFormAutoSave', JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      className="mt-2 w-full rounded-2xl bg-[#FF7A1A] py-4 text-base font-bold text-white font-heading shadow-lg shadow-[#FF7A1A]/25 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
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
    }
  }, [isOpen]);

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

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
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

  const handleFormSubmit = useCallback(
    async (data: StartupFormData | SponsorFormData | SpeakerFormData) => {
      setIsSubmitting(true);
      setSubmitError(null);

      const payload = {
        registrationType: selectedType,
        ...data,
        // Remap field names to match Google Apps Script
        ...(selectedType === 'startup' && { linkedIn: (data as StartupFormData).linkedin }),
        ...(selectedType === 'sponsor' && { organizationName: (data as SponsorFormData).orgName }),
        ...(selectedType === 'speaker' && {
          linkedIn: (data as SpeakerFormData).linkedin,
          areaOfExpertise: (data as SpeakerFormData).expertise,
          previousSpeakingExperience: (data as SpeakerFormData).previousExperience,
        }),
        timestamp: new Date().toISOString(),
      };

      try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify(payload),
        });

        // no-cors returns opaque response, so we treat it as success
        if (response.type === 'opaque' || response.ok) {
          setIsSuccess(true);
          localStorage.removeItem('startupFormAutoSave');
          localStorage.removeItem('sponsorFormAutoSave');
          localStorage.removeItem('speakerFormAutoSave');
        } else {
          throw new Error('Submission failed');
        }
      } catch {
        if (!isSuccess) {
          setSubmitError(
            'Something went wrong. Please try again or contact us directly.'
          );
        }
        // If GOOGLE_SCRIPT_URL is empty, still show success for demo purposes
        if (!GOOGLE_SCRIPT_URL) {
          setIsSuccess(true);
          setSubmitError(null);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [selectedType, isSuccess]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-xl"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[32px] border border-white/60 bg-white/95 shadow-[0_32px_80px_rgba(0,0,0,0.12)] backdrop-blur-2xl"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 30, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Progress Bar */}
            <div className="sticky top-0 z-20 px-6 pt-4">
              <div className="h-1 w-full overflow-hidden rounded-full bg-gray-200">
                <motion.div
                  className="h-full rounded-full bg-[#FF7A1A]"
                  initial={{ width: '33%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                />
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute right-5 top-5 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="p-6 pt-4 md:p-10 md:pt-6">
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
                      className="mt-6 text-2xl font-bold text-[#0A2E6D] font-heading md:text-3xl"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      Registration Successful!
                    </motion.h2>

                    <motion.p
                      className="mt-2 text-gray-500 font-body"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 }}
                    >
                      We'll be in touch soon.
                    </motion.p>

                    <motion.button
                      onClick={closeModal}
                      className="mt-8 rounded-2xl border border-gray-200 bg-white px-10 py-3 text-sm font-semibold text-[#0A2E6D] transition-colors hover:bg-gray-50 font-heading"
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
                    <div className="mb-6 text-center">
                      <h2 className="text-2xl font-bold text-[#0A2E6D] font-heading md:text-3xl">
                        Join Startup Confluence 2.0
                      </h2>
                      <p className="mt-1.5 text-sm text-gray-500 font-body">
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
                            className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all sm:flex-col sm:items-start sm:text-left ${
                              isSelected
                                ? 'border-[#FF7A1A] bg-[#FF7A1A]/5 shadow-md shadow-[#FF7A1A]/10'
                                : 'border-gray-200 bg-gray-50/50 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                                isSelected
                                  ? 'bg-[#FF7A1A]/10 text-[#FF7A1A]'
                                  : 'bg-gray-100 text-gray-400'
                              }`}
                            >
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <p
                                className={`text-sm font-bold font-heading ${
                                  isSelected ? 'text-[#0A2E6D]' : 'text-gray-700'
                                }`}
                              >
                                {cat.emoji} {cat.title}
                              </p>
                              <p className="text-xs text-gray-400 font-body">
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
                  className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-2xl border border-red-200 bg-white px-6 py-3 shadow-xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                >
                  <p className="text-sm font-medium text-red-600 font-body">
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
