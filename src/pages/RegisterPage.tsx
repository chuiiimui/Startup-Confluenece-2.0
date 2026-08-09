import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Mic,
  Rocket,
  Users,
} from 'lucide-react';
import { SEO } from '../components';
import Button from '../components/Button';
import { useRegistration } from '../context/RegistrationContext';
import { usePerfMode } from '../hooks/usePerfMode';
import {
  REGISTRATION_GUIDELINES,
  type GuidelineRole,
} from '../data/registrationGuidelines';

const ICONS: Record<GuidelineRole, React.ElementType> = {
  startup: Rocket,
  speaker: Mic,
  delegate: Users,
};

function isGuidelineRole(value: string | null): value is GuidelineRole {
  return value === 'startup' || value === 'speaker' || value === 'delegate';
}

export default function RegisterPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { openModal } = useRegistration();
  const { isMobile, reduceMotion } = usePerfMode();
  const initialType = searchParams.get('type');
  const [selected, setSelected] = useState<GuidelineRole>(
    isGuidelineRole(initialType) ? initialType : 'startup'
  );

  useEffect(() => {
    if (isGuidelineRole(initialType)) {
      setSelected(initialType);
    }
  }, [initialType]);

  const active = useMemo(
    () =>
      REGISTRATION_GUIDELINES.find((item) => item.type === selected) ??
      REGISTRATION_GUIDELINES[0],
    [selected]
  );

  const selectRole = (type: GuidelineRole) => {
    setSelected(type);
    setSearchParams({ type }, { replace: true });
  };

  return (
    <div
      className="relative min-h-[100dvh] overflow-x-hidden"
      style={{ color: 'var(--text-primary)' }}
    >
      <SEO
        title="Register | Startup Confluence 2.0"
        description="Read guidelines for startups, visitors, and speakers, then continue to registration for Startup Confluence 2.0."
      />

      {!isMobile && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -right-16 top-40 h-80 w-80 rounded-full bg-orange-400/15 blur-3xl" />
        </div>
      )}

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-[calc(7.5rem+env(safe-area-inset-bottom))] pt-[7.25rem] sm:px-6 sm:pb-24 sm:pt-28 md:pt-32">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium transition-colors hover:text-accent"
          style={{ color: 'var(--text-secondary)' }}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="mt-6 max-w-3xl sm:mt-8">
          <p
            className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] sm:mb-3 sm:text-xs sm:tracking-[0.2em]"
            style={{ color: 'var(--badge-text)' }}
          >
            Registration
          </p>
          <h1 className="font-heading text-[1.4rem] font-bold leading-snug sm:text-3xl md:text-5xl">
            Choose your path
          </h1>
          <p
            className="mt-2.5 text-xs leading-relaxed sm:mt-4 sm:text-base md:text-lg"
            style={{ color: 'var(--text-secondary)' }}
          >
            Review the guidelines for startups, visitors, and speakers first. When you are ready,
            continue to the registration form.
          </p>
        </div>

        {/* Role chips: horizontal scroll on small phones, grid from sm */}
        <div className="-mx-4 mt-8 flex gap-3 overflow-x-auto px-4 pb-1 hide-scrollbar sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
          {REGISTRATION_GUIDELINES.map((role) => {
            const Icon = ICONS[role.type];
            const isActive = selected === role.type;
            return (
              <button
                key={role.type}
                type="button"
                onClick={() => selectRole(role.type)}
                className={`clay-card min-w-[9.5rem] shrink-0 rounded-2xl p-4 text-left transition-transform sm:min-w-0 sm:p-5 ${
                  isActive ? 'ring-2 ring-accent' : 'sm:hover:-translate-y-0.5'
                }`}
              >
                <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent sm:mb-3 sm:h-10 sm:w-10">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <h2 className="font-heading text-sm font-bold sm:text-lg">{role.title}</h2>
                <p className="mt-1 text-[11px] sm:text-sm" style={{ color: 'var(--text-muted)' }}>
                  {role.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        <motion.section
          key={active.type}
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25 }}
          className="clay-card mt-6 rounded-[22px] p-5 sm:mt-8 sm:rounded-[28px] sm:p-6 md:p-10"
        >
          <div className="flex flex-col gap-7 lg:flex-row lg:gap-12">
            <div className="min-w-0 flex-1">
              <h3 className="font-heading text-lg font-bold sm:text-2xl md:text-3xl">
                {active.title} guidelines
              </h3>
              <p className="mt-2.5 text-xs leading-relaxed sm:mt-3 sm:text-base" style={{ color: 'var(--text-secondary)' }}>
                {active.summary}
              </p>

              <ul className="mt-4 space-y-2.5 sm:mt-6 sm:space-y-3">
                {active.guidelines.map((item) => (
                  <li key={item} className="flex gap-2.5 text-xs leading-relaxed sm:gap-3 sm:text-sm md:text-base">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="clay-card clay-card--blue w-full shrink-0 rounded-2xl p-4 sm:p-5 lg:max-w-sm">
              <h4 className="font-heading text-base font-semibold sm:text-lg">Before you continue</h4>
              <ul className="mt-4 space-y-2.5">
                {active.checklist.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                className="mt-6 hidden w-full sm:inline-flex"
                icon={<ArrowRight className="h-5 w-5" />}
                onClick={() => openModal(active.type)}
              >
                Continue to form
              </Button>
              <p className="mt-3 hidden text-center text-xs sm:block" style={{ color: 'var(--text-muted)' }}>
                Looking to sponsor or partner?{' '}
                <Link to="/partner" className="font-semibold text-accent hover:underline">
                  View offerings
                </Link>
              </p>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-[70] border-t px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:hidden"
        style={{
          background: 'var(--nav-bg-scrolled)',
          borderColor: 'var(--border)',
        }}
      >
        <Button
          size="md"
          className="w-full !px-4 !py-2.5 !text-sm"
          icon={<ArrowRight className="h-4 w-4" />}
          onClick={() => openModal(active.type)}
        >
          Continue as {active.title}
        </Button>
        <p className="mt-2 text-center text-[11px]" style={{ color: 'var(--text-muted)' }}>
          Sponsor or partner?{' '}
          <Link to="/partner" className="font-semibold text-accent">
            View offerings
          </Link>
        </p>
      </div>
    </div>
  );
}
