import { useCallback, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useRegistration } from '../context/RegistrationContext';
import { getLenisInstance } from '../lib/utils';

const SPONSORSHIP_TIERS = [
  { type: 'Title Sponsor', indicativeAmount: 200000 },
  { type: 'Food Sponsor', indicativeAmount: 10000 },
  { type: 'Brand Sponsor', indicativeAmount: 100000 },
  { type: 'Event Sponsor', indicativeAmount: 50000 },
] as const;

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
const errorTextClass = 'text-xs mt-1 font-body text-[color:var(--badge-text)]';

function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

function getSavedSponsorData(): Partial<SponsorFormData> {
  try {
    const saved = localStorage.getItem('sponsorFormAutoSave');
    if (!saved) return {};
    const parsed = JSON.parse(saved) as Partial<SponsorFormData>;
    return Object.fromEntries(
      Object.entries(parsed).filter(([, v]) => v !== undefined && v !== null)
    ) as Partial<SponsorFormData>;
  } catch {
    return {};
  }
}

function scrollFormToFirstError() {
  requestAnimationFrame(() => {
    document
      .querySelector('.sponsor-form-scroll .form-glass-input-error')
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
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
    } else {
      setValue(
        'expectedContribution',
        'Negotiable after mutual discussion with the organizers',
        { shouldValidate: false }
      );
    }
  }, [sponsorshipAmount, setValue]);

  const selectTier = (type: string) => {
    const tier = SPONSORSHIP_TIERS.find((t) => t.type === type);
    const amount = tier?.indicativeAmount ?? 0;
    setValue('sponsorshipType', type, { shouldValidate: true });
    setValue('sponsorshipCategory', type, { shouldValidate: true });
    setValue('sponsorshipAmount', amount, { shouldValidate: true, shouldDirty: true });
    setValue('expectedContribution', formatINR(amount), { shouldValidate: false });
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

      <div className="clay-card space-y-3 rounded-xl p-3">
        <div>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            Sponsorship Category <span className="text-red-400">*</span>
          </p>
          <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
            Choose a category. Contribution is negotiable after mutual discussion with the
            organizers — no fixed upper or lower limit.
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
                onClick={() => selectTier(tier.type)}
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
                      Negotiable after mutual discussion with the organizers
                    </p>
                  </div>
                  <span
                    className="shrink-0 rounded-full px-2.5 py-1 text-xs font-bold"
                    style={{
                      background: 'var(--badge-bg)',
                      color: 'var(--badge-text)',
                      border: '1px solid var(--badge-border)',
                    }}
                  >
                    Negotiable
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
            <label className={labelClass}>Contribution amount (₹)</label>
            <div
              className={`${inputClass} cursor-not-allowed select-none opacity-90`}
              aria-readonly="true"
              onMouseDown={(e) => e.preventDefault()}
            >
              {formatINR(selectedTier.indicativeAmount)}
            </div>
            <input type="hidden" {...register('sponsorshipAmount', { valueAsNumber: true })} />
            <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
              Fixed suggestion for {selectedTier.type}. Final amount is negotiable after mutual
              discussion with the organizers.
            </p>
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
 * Sponsor application modal — posts to /api/sponsor.
 */
export default function SponsorModal() {
  const { isSponsorOpen, closeSponsorModal } = useRegistration();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSponsorOpen) {
      setIsSuccess(false);
      setSubmitError(null);
      setIsSubmitting(false);
      requestAnimationFrame(() => scrollRef.current?.scrollTo({ top: 0 }));
    }
  }, [isSponsorOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSponsorModal();
    };
    if (isSponsorOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isSponsorOpen, closeSponsorModal]);

  useEffect(() => {
    const lenis = getLenisInstance();
    if (isSponsorOpen) {
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
  }, [isSponsorOpen]);

  useEffect(() => {
    if (!submitError) return;
    const t = setTimeout(() => setSubmitError(null), 5000);
    return () => clearTimeout(t);
  }, [submitError]);

  const onSponsorSubmit = useCallback(async (data: SponsorFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/sponsor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          organizationName: data.orgName,
          sponsorshipType: data.sponsorshipType,
          sponsorshipAmount: data.sponsorshipAmount,
          sponsorshipCategory: data.sponsorshipType || data.sponsorshipCategory,
          expectedContribution:
            data.expectedContribution ||
            (data.sponsorshipAmount > 0
              ? formatINR(data.sponsorshipAmount)
              : 'Negotiable after mutual discussion with the organizers'),
          timestamp: new Date().toISOString(),
        }),
      });

      let result: { ok?: boolean; error?: string } = { ok: response.ok };
      try {
        result = (await response.json()) as { ok?: boolean; error?: string };
      } catch {
        /* ignore */
      }

      if (!response.ok || result.ok === false) {
        throw new Error(result.error || `Server returned ${response.status}`);
      }

      setIsSuccess(true);
      localStorage.removeItem('sponsorFormAutoSave');
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

  return (
    <AnimatePresence>
      {isSponsorOpen && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-stretch justify-center p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="absolute inset-0 backdrop-blur-xl"
            style={{ background: 'var(--overlay-bg)' }}
            onClick={closeSponsorModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="form-glass-panel clay-card relative z-10 flex h-[100dvh] max-h-[100dvh] w-full max-w-2xl flex-col overflow-hidden rounded-none sm:h-[min(100dvh-2rem,920px)] sm:max-h-[calc(100dvh-2rem)] sm:rounded-[32px]"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 30, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sponsor-modal-title"
          >
            <div
              className="relative z-20 shrink-0 border-b px-6 pb-4 pt-[max(1.25rem,env(safe-area-inset-top))] sm:pt-5"
              style={{
                borderColor: 'var(--border)',
                background: 'var(--bg-alt)',
              }}
            >
              <h2
                id="sponsor-modal-title"
                className="pr-12 font-heading text-xl font-bold md:text-2xl"
                style={{ color: 'var(--text-primary)' }}
              >
                Sponsor Application
              </h2>
              <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
                Apply as a sponsor for Startup Confluence 2.0
              </p>
              <button
                type="button"
                onClick={closeSponsorModal}
                className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
                style={{
                  borderColor: 'var(--border)',
                  background: 'var(--surface)',
                  color: 'var(--text-secondary)',
                }}
                aria-label="Close sponsor form"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div
              ref={scrollRef}
              data-lenis-prevent
              className="sponsor-form-scroll registration-form-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 md:px-8 md:py-6"
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
                      Sponsorship Enquiry Received
                    </h3>
                    <p className="mt-2 max-w-sm text-sm" style={{ color: 'var(--text-secondary)' }}>
                      Thanks for your sponsorship interest. A confirmation email with your
                      sponsorship type, amount, and next steps has been sent — check Inbox and
                      Spam.
                    </p>
                    <button
                      type="button"
                      onClick={closeSponsorModal}
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
                    <SponsorApplicationForm
                      isSubmitting={isSubmitting}
                      onSubmit={onSponsorSubmit}
                    />
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
