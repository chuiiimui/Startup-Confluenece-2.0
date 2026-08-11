import { useCallback, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useRegistration } from '../context/RegistrationContext';
import { getLenisInstance } from '../lib/utils';

const PARTNER_CATEGORIES = [
  'Incubation Partner',
  'Technology Partner',
  'Media Partner',
] as const;

interface PartnerFormData {
  orgName: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  partnerCategory: string;
  companyDescription: string;
  yourOffering: string;
}

const inputClass = 'form-glass-input font-body';
const inputErrorClass = 'form-glass-input form-glass-input-error font-body';
const labelClass = 'form-glass-label font-body';
const errorTextClass = 'text-xs mt-1 font-body text-[color:var(--badge-text)]';

function getSavedPartnerData(): Partial<PartnerFormData> {
  try {
    const saved = localStorage.getItem('partnerFormAutoSave');
    if (!saved) return {};
    const parsed = JSON.parse(saved) as Partial<PartnerFormData>;
    return Object.fromEntries(
      Object.entries(parsed).filter(([, v]) => v !== undefined && v !== null)
    ) as Partial<PartnerFormData>;
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

      <div className="clay-card space-y-3 rounded-xl p-3">
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
        <label className={labelClass}>Your Offering</label>
        <textarea
          rows={2}
          className={inputClass}
          placeholder="Describe what you can offer as a partner"
          {...register('yourOffering')}
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

/**
 * Partner application modal — posts to /api/partner.
 */
export default function PartnerModal() {
  const { isPartnerOpen, closePartnerModal } = useRegistration();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPartnerOpen) {
      setIsSuccess(false);
      setSubmitError(null);
      setIsSubmitting(false);
      requestAnimationFrame(() => scrollRef.current?.scrollTo({ top: 0 }));
    }
  }, [isPartnerOpen]);

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

  const onPartnerSubmit = useCallback(async (data: PartnerFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          organizationName: data.orgName,
          partnerCategory: data.partnerCategory,
          yourOffering: data.yourOffering,
          additionalNotes: data.yourOffering,
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
      localStorage.removeItem('partnerFormAutoSave');
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
      {isPartnerOpen && (
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
            onClick={closePartnerModal}
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
            aria-labelledby="partner-modal-title"
          >
            <div
              className="relative z-20 shrink-0 border-b px-6 pb-4 pt-[max(1.25rem,env(safe-area-inset-top))] sm:pt-5"
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
                Partner Application
              </h2>
              <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
                Apply as a partner for Startup Confluence 2.0
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
              className="partner-form-scroll registration-form-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 md:px-8 md:py-6"
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
                      Partner Application Received
                    </h3>
                    <p className="mt-2 max-w-sm text-sm" style={{ color: 'var(--text-secondary)' }}>
                      Thanks for applying as a partner. A confirmation email with your partner
                      category and next steps has been sent — check Inbox and Spam.
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
                    <PartnerApplicationForm
                      isSubmitting={isSubmitting}
                      onSubmit={onPartnerSubmit}
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
