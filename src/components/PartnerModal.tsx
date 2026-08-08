import React, { useCallback, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle2 } from 'lucide-react';
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

const inputClass = 'form-glass-input font-body';
const inputErrorClass = 'form-glass-input form-glass-input-error font-body';
const labelClass = 'form-glass-label font-body';
const errorTextClass = 'text-xs text-red-300 mt-1 font-body';

function getSavedFormData(): Partial<PartnerFormData> {
  try {
    const saved = localStorage.getItem('partnerFormAutoSave');
    if (!saved) return {};
    return JSON.parse(saved) as Partial<PartnerFormData>;
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

/**
 * Dedicated partner application modal — separate from event registration.
 */
export default function PartnerModal() {
  const { isPartnerOpen, closePartnerModal } = useRegistration();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PartnerFormData>({
    defaultValues: {
      partnerCategory: '',
      ...getSavedFormData(),
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

  const onSubmit = useCallback(
    async (data: PartnerFormData) => {
      setIsSubmitting(true);
      setSubmitError(null);

      if (!GOOGLE_SCRIPT_URL) {
        setSubmitError('Partner endpoint is not configured. Set VITE_GOOGLE_SCRIPT_URL.');
        setIsSubmitting(false);
        return;
      }

      const payload = {
        registrationType: 'partner',
        ...data,
        organizationName: data.orgName,
        partnerCategory: data.partnerCategory,
        timestamp: new Date().toISOString(),
      };

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
          reset({
            orgName: '',
            contactPerson: '',
            email: '',
            phone: '',
            website: '',
            partnerCategory: '',
            companyDescription: '',
            additionalNotes: '',
          });
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
    },
    [reset]
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
                Become a Partner
              </h2>
              <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
                Join as an Incubation, Technology, or Media Partner
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
                      Thanks for partnering with Startup Confluence 2.0. Our team will review your
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
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit, scrollFormToFirstError)}
                    className="space-y-2.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
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
                        {errors.orgName && (
                          <p className={errorTextClass}>{errors.orgName.message}</p>
                        )}
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
                        {errors.email && (
                          <p className={errorTextClass}>{errors.email.message}</p>
                        )}
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
                        {errors.phone && (
                          <p className={errorTextClass}>{errors.phone.message}</p>
                        )}
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
                        <p
                          className="text-sm font-semibold"
                          style={{ color: 'var(--text-primary)' }}
                        >
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
                        className={
                          errors.companyDescription ? inputErrorClass : inputClass
                        }
                        placeholder="Brief description of your organization and partnership interest"
                        {...register('companyDescription', {
                          required: 'Organization description is required',
                        })}
                      />
                      {errors.companyDescription && (
                        <p className={errorTextClass}>
                          {errors.companyDescription.message}
                        </p>
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
                  </motion.form>
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
