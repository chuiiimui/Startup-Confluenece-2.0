import React, { useCallback, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle2, Handshake, Banknote } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useRegistration } from '../context/RegistrationContext';
import { getLenisInstance } from '../lib/utils';

const GOOGLE_SCRIPT_URL =
  (import.meta.env.VITE_GOOGLE_SCRIPT_URL as string | undefined)?.trim() ||
  'https://script.google.com/macros/s/AKfycbx3KEix1mtaKzco5pj-8ut-VjChYhanuxUt_JPxHPbHPq0d6VZBT5PvhVm7o6qjrqAZ2g/exec';

const PARTNER_CATEGORIES = [
  'Incubation Partner',
  'Technology Partner',
  'Media Partner',
] as const;

const SPONSORSHIP_TIERS = [
  { type: 'Title Sponsor', suggested: 200000 },
  { type: 'Food Sponsor', suggested: 10000 },
  { type: 'Brand Sponsor', suggested: 100000 },
  { type: 'Event Sponsor', suggested: 50000 },
] as const;

type PartnerMode = 'partner' | 'sponsor';

interface PartnerFormData {
  orgName: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  partnerCategory: string;
  companyDescription: string;
  additionalNotes: string;
}

interface SponsorFormData {
  orgName: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  sponsorshipCategory: string;
  sponsorshipType: string;
  sponsorshipAmount: number;
  companyDescription: string;
  expectedContribution: string;
  additionalNotes: string;
}

const inputClass = 'form-glass-input font-body';
const inputErrorClass = 'form-glass-input form-glass-input-error font-body';
const labelClass = 'form-glass-label font-body';
const errorTextClass = 'text-xs text-red-300 mt-1 font-body';

function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

function getSavedPartnerData(): Partial<PartnerFormData> {
  try {
    const saved = localStorage.getItem('partnerFormAutoSave');
    if (!saved) return {};
    return JSON.parse(saved) as Partial<PartnerFormData>;
  } catch {
    return {};
  }
}

function getSavedSponsorData(): Partial<SponsorFormData> {
  try {
    const saved = localStorage.getItem('sponsorFormAutoSave');
    if (!saved) return {};
    return JSON.parse(saved) as Partial<SponsorFormData>;
  } catch {
    return {};
  }
}

function scrollFormToFirstError() {
  requestAnimationFrame(() => {
    document
      .querySelector('.partner-form-scroll .form-glass-input-error')
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

function PartnerApplicationForm({
  isSubmitting,
  onSubmit,
}: {
  isSubmitting: boolean;
  onSubmit: (data: PartnerFormData) => void;
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PartnerFormData>({
    defaultValues: {
      partnerCategory: '',
      ...getSavedPartnerData(),
    },
    shouldFocusError: true,
  });

  const partnerCategory = watch('partnerCategory');

  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem('partnerFormAutoSave', JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form onSubmit={handleSubmit(onSubmit, scrollFormToFirstError)} className="space-y-2.5">
      <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
        <div>
          <label className={labelClass}>
            Organization Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            className={errors.orgName ? inputErrorClass : inputClass}
            placeholder="Company / Organization"
            {...register('orgName', {
              required: 'Organization name is required',
            })}
          />
          {errors.orgName && <p className={errorTextClass}>{errors.orgName.message}</p>}
        </div>
        <div>
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
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
        <div>
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
          {errors.email && <p className={errorTextClass}>{errors.email.message}</p>}
        </div>
        <div>
          <label className={labelClass}>
            Phone <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            className={errors.phone ? inputErrorClass : inputClass}
            placeholder="+91 XXXXX XXXXX"
            {...register('phone', {
              required: 'Phone number is required',
            })}
          />
          {errors.phone && <p className={errorTextClass}>{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass}>Website</label>
        <input
          type="url"
          className={inputClass}
          placeholder="https://yourcompany.com"
          {...register('website')}
        />
      </div>

      <div
        className="space-y-3 rounded-xl border p-3"
        style={{
          borderColor: 'var(--border-strong)',
          background: 'var(--surface)',
        }}
      >
        <div>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            Partner Category <span className="text-red-400">*</span>
          </p>
          <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
            Choose how you want to partner with us.
          </p>
        </div>

        <input
          type="hidden"
          {...register('partnerCategory', {
            required: 'Please select a partner category',
          })}
        />

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {PARTNER_CATEGORIES.map((category) => {
            const selected = partnerCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() =>
                  setValue('partnerCategory', category, {
                    shouldValidate: true,
                  })
                }
                className={`form-glass-option rounded-xl px-3 py-3 text-center text-sm font-semibold transition-colors ${
                  selected ? 'is-selected' : ''
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
        {errors.partnerCategory && (
          <p className={errorTextClass}>{errors.partnerCategory.message}</p>
        )}
      </div>

      <div>
        <label className={labelClass}>
          Organization Description <span className="text-red-400">*</span>
        </label>
        <textarea
          rows={3}
          className={errors.companyDescription ? inputErrorClass : inputClass}
          placeholder="Brief description of your organization and partnership interest"
          {...register('companyDescription', {
            required: 'Organization description is required',
          })}
        />
        {errors.companyDescription && (
          <p className={errorTextClass}>{errors.companyDescription.message}</p>
        )}
      </div>

      <div>
        <label className={labelClass}>Additional Notes</label>
        <textarea
          rows={2}
          className={inputClass}
          placeholder="Any specific requirements or notes"
          {...register('additionalNotes')}
        />
      </div>

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
          'Submit Partner Application'
        )}
      </motion.button>
    </form>
  );
}

function SponsorApplicationForm({
  isSubmitting,
  onSubmit,
}: {
  isSubmitting: boolean;
  onSubmit: (data: SponsorFormData) => void;
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<SponsorFormData>({
    defaultValues: {
      sponsorshipType: '',
      sponsorshipCategory: '',
      sponsorshipAmount: 0,
      expectedContribution: '',
      ...getSavedSponsorData(),
    },
    shouldFocusError: true,
  });

  const sponsorshipType = watch('sponsorshipType');
  const sponsorshipAmount = watch('sponsorshipAmount');
  const selectedTier = SPONSORSHIP_TIERS.find((t) => t.type === sponsorshipType);

  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem('sponsorFormAutoSave', JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    const amount = Number(sponsorshipAmount) || 0;
    if (amount > 0) {
      setValue('expectedContribution', formatINR(amount), { shouldValidate: false });
    }
  }, [sponsorshipAmount, setValue]);

  // Re-check amount against the newly selected tier's minimum
  useEffect(() => {
    if (!sponsorshipType) return;
    void trigger('sponsorshipAmount');
  }, [sponsorshipType, trigger]);

  const selectTier = (type: string, suggested: number) => {
    setValue('sponsorshipType', type, { shouldValidate: true });
    setValue('sponsorshipCategory', type, { shouldValidate: true });
    setValue('sponsorshipAmount', suggested, { shouldValidate: true, shouldDirty: true });
    setValue('expectedContribution', formatINR(suggested), { shouldValidate: false });
  };

  const getTierMinimum = (type?: string) => {
    const tier = SPONSORSHIP_TIERS.find((t) => t.type === type);
    return tier ? Math.round(tier.suggested * 0.75) : 0;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, scrollFormToFirstError)} className="space-y-2.5">
      <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
        <div>
          <label className={labelClass}>
            Organization Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            className={errors.orgName ? inputErrorClass : inputClass}
            placeholder="Company / Organization"
            {...register('orgName', { required: 'Organization name is required' })}
          />
          {errors.orgName && <p className={errorTextClass}>{errors.orgName.message}</p>}
        </div>
        <div>
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
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
        <div>
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
          {errors.email && <p className={errorTextClass}>{errors.email.message}</p>}
        </div>
        <div>
          <label className={labelClass}>
            Phone <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            className={errors.phone ? inputErrorClass : inputClass}
            placeholder="+91 XXXXX XXXXX"
            {...register('phone', { required: 'Phone number is required' })}
          />
          {errors.phone && <p className={errorTextClass}>{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass}>Website</label>
        <input
          type="url"
          className={inputClass}
          placeholder="https://yourcompany.com"
          {...register('website')}
        />
      </div>

      <div
        className="space-y-3 rounded-xl border p-3"
        style={{
          borderColor: 'var(--border-strong)',
          background: 'var(--surface)',
        }}
      >
        <div>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            Sponsorship Category <span className="text-red-400">*</span>
          </p>
          <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
            Choose a category. Amounts shown are indicative — you can adjust your contribution.
          </p>
        </div>

        <input
          type="hidden"
          {...register('sponsorshipType', {
            required: 'Please select a sponsorship category',
          })}
        />
        <input type="hidden" {...register('sponsorshipCategory')} />
        <input type="hidden" {...register('expectedContribution')} />

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {SPONSORSHIP_TIERS.map((tier) => {
            const selected = sponsorshipType === tier.type;
            const isTitle = tier.type === 'Title Sponsor';
            return (
              <button
                key={tier.type}
                type="button"
                onClick={() => selectTier(tier.type, tier.suggested)}
                className={`form-glass-option rounded-xl px-4 py-3 text-left transition-colors ${
                  selected ? 'is-selected' : ''
                } ${isTitle ? 'sm:col-span-2' : ''}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                      {tier.type}
                      {isTitle ? ' — Flagship Partnership' : ''}
                    </p>
                    <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                      Suggested starting range · flexible
                    </p>
                  </div>
                  <span
                    className="shrink-0 rounded-full px-2.5 py-1 text-xs font-bold tabular-nums"
                    style={{
                      background: 'var(--badge-bg)',
                      color: 'var(--badge-text)',
                      border: '1px solid var(--badge-border)',
                    }}
                  >
                    ≈ {formatINR(tier.suggested)}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {errors.sponsorshipType && (
          <p className={errorTextClass}>{errors.sponsorshipType.message}</p>
        )}

        {selectedTier && (
          <div>
            <label className={labelClass}>
              Your contribution amount (₹) <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              inputMode="numeric"
              min={getTierMinimum(selectedTier.type)}
              step={1}
              className={errors.sponsorshipAmount ? inputErrorClass : inputClass}
              placeholder={`Around ${formatINR(selectedTier.suggested)}`}
              {...register('sponsorshipAmount', {
                required: 'Please enter your contribution amount',
                valueAsNumber: true,
                validate: (value, formValues) => {
                  const amount = Number(value);
                  if (!Number.isFinite(amount) || amount <= 0) {
                    return 'Enter a valid amount greater than 0';
                  }
                  const tierType = formValues.sponsorshipType || selectedTier.type;
                  const tier =
                    SPONSORSHIP_TIERS.find((t) => t.type === tierType) || selectedTier;
                  const min = Math.round(tier.suggested * 0.75);
                  if (amount < min) {
                    return `Minimum contribution for ${tier.type} is ${formatINR(min)}`;
                  }
                  return true;
                },
              })}
            />
            <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
              Suggested ≈ {formatINR(selectedTier.suggested)}. You can enter any amount from{' '}
              {formatINR(getTierMinimum(selectedTier.type))} upward — no upper limit.
            </p>
            {errors.sponsorshipAmount && (
              <p className={errorTextClass}>{errors.sponsorshipAmount.message}</p>
            )}
          </div>
        )}

        {sponsorshipType === 'Title Sponsor' && (
          <div
            className="rounded-lg border px-3 py-2 text-xs"
            style={{
              borderColor: 'var(--badge-border)',
              background: 'var(--badge-bg)',
              color: 'var(--badge-text)',
            }}
          >
            <strong>Title Sponsor</strong> is typically around{' '}
            <strong>≈ {formatINR(200000)}</strong> — final amount is flexible.
          </div>
        )}
      </div>

      <div>
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
      </div>

      <div>
        <label className={labelClass}>Additional Notes</label>
        <textarea
          rows={2}
          className={inputClass}
          placeholder="Any specific requirements or notes"
          {...register('additionalNotes')}
        />
      </div>

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
          'Become a Sponsor'
        )}
      </motion.button>
    </form>
  );
}

/**
 * Dedicated partner / sponsor application modal — separate from event registration.
 */
export default function PartnerModal() {
  const { isPartnerOpen, closePartnerModal } = useRegistration();
  const [mode, setMode] = useState<PartnerMode>('partner');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPartnerOpen) {
      setIsSuccess(false);
      setSubmitError(null);
      setIsSubmitting(false);
      setMode('partner');
      requestAnimationFrame(() => scrollRef.current?.scrollTo({ top: 0 }));
    }
  }, [isPartnerOpen]);

  useEffect(() => {
    if (!isPartnerOpen) return;
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [mode, isPartnerOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePartnerModal();
    };
    if (isPartnerOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isPartnerOpen, closePartnerModal]);

  useEffect(() => {
    const lenis = getLenisInstance();
    if (isPartnerOpen) {
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
  }, [isPartnerOpen]);

  useEffect(() => {
    if (!submitError) return;
    const t = setTimeout(() => setSubmitError(null), 5000);
    return () => clearTimeout(t);
  }, [submitError]);

  const submitPayload = useCallback(async (payload: Record<string, unknown>) => {
    setIsSubmitting(true);
    setSubmitError(null);

    if (!GOOGLE_SCRIPT_URL) {
      setSubmitError('Partner endpoint is not configured. Set VITE_GOOGLE_SCRIPT_URL.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
        redirect: 'follow',
      });

      if (response.ok) {
        let result: { ok?: boolean; error?: string } = { ok: true };
        try {
          result = (await response.json()) as { ok?: boolean; error?: string };
        } catch {
          /* non-JSON success */
        }
        if (result.ok === false) throw new Error(result.error || 'Submission failed');
        setIsSuccess(true);
        localStorage.removeItem('partnerFormAutoSave');
        localStorage.removeItem('sponsorFormAutoSave');
        return;
      }
      throw new Error(`Server returned ${response.status}`);
    } catch (err) {
      const detail =
        err instanceof Error && err.message
          ? err.message
          : 'Please try again or contact us directly.';
      setSubmitError(`Something went wrong. ${detail}`);
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const onPartnerSubmit = useCallback(
    async (data: PartnerFormData) => {
      await submitPayload({
        registrationType: 'partner',
        ...data,
        organizationName: data.orgName,
        partnerCategory: data.partnerCategory,
        timestamp: new Date().toISOString(),
      });
    },
    [submitPayload]
  );

  const onSponsorSubmit = useCallback(
    async (data: SponsorFormData) => {
      await submitPayload({
        registrationType: 'sponsor',
        ...data,
        organizationName: data.orgName,
        sponsorshipType: data.sponsorshipType,
        sponsorshipAmount: data.sponsorshipAmount,
        sponsorshipCategory: data.sponsorshipType || data.sponsorshipCategory,
        expectedContribution:
          data.expectedContribution || formatINR(data.sponsorshipAmount || 0),
        timestamp: new Date().toISOString(),
      });
    },
    [submitPayload]
  );

  return (
    <AnimatePresence>
      {isPartnerOpen && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center px-0 pt-[6.5rem] pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:items-center sm:px-4 sm:pt-24 sm:pb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="absolute inset-0 backdrop-blur-xl"
            style={{ background: 'var(--overlay-bg)' }}
            onClick={closePartnerModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="form-glass-panel relative z-10 flex max-h-[min(calc(100dvh-7.5rem),680px)] w-full max-w-2xl flex-col overflow-hidden rounded-t-[28px] sm:max-h-[min(calc(100dvh-8rem),700px)] sm:rounded-[32px]"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 30, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="partner-modal-title"
          >
            <div
              className="relative z-20 shrink-0 border-b px-6 pb-4 pt-5"
              style={{
                borderColor: 'var(--border)',
                background: 'var(--bg-alt)',
              }}
            >
              <h2
                id="partner-modal-title"
                className="pr-12 font-heading text-xl font-bold md:text-2xl"
                style={{ color: 'var(--text-primary)' }}
              >
                Partner & Sponsor
              </h2>
              <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
                Apply as a partner or sponsor Startup Confluence 2.0
              </p>
              <button
                type="button"
                onClick={closePartnerModal}
                className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
                style={{
                  borderColor: 'var(--border)',
                  background: 'var(--surface)',
                  color: 'var(--text-secondary)',
                }}
                aria-label="Close partner form"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div
              ref={scrollRef}
              data-lenis-prevent
              className="partner-form-scroll registration-form-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-4 md:px-8 md:py-6"
            >
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    className="flex min-h-[280px] flex-col items-center justify-center py-10 text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <CheckCircle2 className="mb-4 h-14 w-14 text-emerald-500" />
                    <h3
                      className="font-heading text-2xl font-bold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Application received
                    </h3>
                    <p className="mt-2 max-w-sm text-sm" style={{ color: 'var(--text-secondary)' }}>
                      Thanks for supporting Startup Confluence 2.0. Our team will review your
                      application shortly.
                    </p>
                    <button
                      type="button"
                      onClick={closePartnerModal}
                      className="mt-6 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="mb-5 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setMode('partner')}
                        className={`form-glass-option flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold ${
                          mode === 'partner' ? 'is-selected' : ''
                        }`}
                      >
                        <Handshake className="h-4 w-4" />
                        Partner
                      </button>
                      <button
                        type="button"
                        onClick={() => setMode('sponsor')}
                        className={`form-glass-option flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold ${
                          mode === 'sponsor' ? 'is-selected' : ''
                        }`}
                      >
                        <Banknote className="h-4 w-4" />
                        Sponsor
                      </button>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={mode}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {mode === 'partner' ? (
                          <PartnerApplicationForm
                            isSubmitting={isSubmitting}
                            onSubmit={onPartnerSubmit}
                          />
                        ) : (
                          <SponsorApplicationForm
                            isSubmitting={isSubmitting}
                            onSubmit={onSponsorSubmit}
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {submitError && (
              <div
                className="pointer-events-none absolute bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-2xl border border-red-400/40 px-6 py-3 shadow-xl"
                style={{ background: 'var(--bg-elevated)', color: 'var(--text-primary)' }}
              >
                {submitError}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
