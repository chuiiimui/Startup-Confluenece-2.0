'use client';

import { lazy, Suspense } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  CheckCircle2,
  Download,
} from 'lucide-react';
import Button from '../components/Button';
import { useRegistration } from '../context/RegistrationContext';
import { usePerfMode } from '../hooks/usePerfMode';
import {
  SPONSOR_OFFERING_TIERS,
  SPONSORSHIP_INTRO,
} from '../data/sponsorOfferings';

const Sponsors = lazy(() => import('../sections/Sponsors'));
const Footer = lazy(() =>
  import('../sections/Footer').then((m) => ({ default: m.Footer }))
);

export default function SponsorsPage() {
  const { openSponsorModal } = useRegistration();
  const { isMobile } = usePerfMode();

  return (
    <div
      className="relative min-h-[100dvh] overflow-x-hidden pb-[calc(6.5rem+env(safe-area-inset-bottom))] sm:pb-0"
      style={{ color: 'var(--text-primary)' }}
    >
      {!isMobile && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 top-16 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -left-16 bottom-20 h-80 w-80 rounded-full bg-orange-400/15 blur-3xl" />
        </div>
      )}

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-8 pt-[7.25rem] sm:px-6 sm:pb-12 sm:pt-28 md:pt-32">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium transition-colors hover:text-accent"
          style={{ color: 'var(--text-secondary)' }}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p
              className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] sm:mb-3 sm:text-xs sm:tracking-[0.2em]"
              style={{ color: 'var(--badge-text)' }}
            >
              Sponsor the summit
            </p>
            <h1 className="font-heading text-[1.35rem] font-bold leading-snug sm:text-3xl md:text-5xl">
              Sponsorship offerings
            </h1>
            <p
              className="mt-2.5 text-xs leading-relaxed sm:mt-4 sm:text-base md:text-lg"
              style={{ color: 'var(--text-secondary)' }}
            >
              Review the benefits for each category, then continue to the sponsor application
              form.
            </p>
          </div>

          <a
            href="/sponsorship-offerings.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 self-stretch rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent sm:self-start"
            style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
          >
            <Download className="h-4 w-4" />
            Download PDF
          </a>
        </div>

        <p
          className="mt-6 max-w-4xl text-sm leading-relaxed sm:mt-8 sm:text-base"
          style={{ color: 'var(--text-secondary)' }}
        >
          {SPONSORSHIP_INTRO}
        </p>

        <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 lg:grid-cols-2 lg:items-stretch">
          {SPONSOR_OFFERING_TIERS.map((tier) => (
            <article
              key={tier.type}
              className="clay-card flex h-full flex-col rounded-[20px] p-5 sm:rounded-[24px] sm:p-6 md:p-7"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-3">
                <h2 className="font-heading text-base font-bold sm:text-xl md:text-2xl">
                  {tier.type}
                </h2>
                <span className="w-fit rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent sm:px-3 sm:text-sm">
                  Negotiable after mutual discussion with the organizers
                </span>
              </div>
              <ul className="mt-4 flex-1 space-y-2 sm:mt-5 sm:space-y-2.5">
                {tier.offerings.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-xs leading-relaxed sm:gap-3 sm:text-sm"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 sm:mt-auto sm:pt-6">
                <Button
                  className="w-full"
                  icon={<ArrowRight className="h-4 w-4" />}
                  onClick={() => openSponsorModal()}
                >
                  Apply as {tier.type}
                </Button>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-sm leading-relaxed sm:mt-10" style={{ color: 'var(--text-muted)' }}>
          Looking to partner instead?{' '}
          <Link href="/partner" className="font-semibold text-accent hover:underline">
            View partnership offerings
          </Link>
        </p>
      </div>

      <Suspense fallback={null}>
        <Sponsors />
      </Suspense>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      <div
        className="fixed inset-x-0 bottom-0 z-[70] border-t px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:hidden"
        style={{
          background: 'var(--nav-bg-scrolled)',
          borderColor: 'var(--border)',
        }}
      >
        <Button
          size="md"
          className="w-full !px-4 !py-2.5 !text-sm"
          icon={<Banknote className="h-4 w-4" />}
          onClick={() => openSponsorModal()}
        >
          Apply as Sponsor
        </Button>
        <p className="mt-2 text-center text-[11px]" style={{ color: 'var(--text-muted)' }}>
          Want to partner?{' '}
          <Link href="/partner" className="font-semibold text-accent">
            Go to Partner page
          </Link>
        </p>
      </div>
    </div>
  );
}
