'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  CheckCircle2,
  Download,
  Handshake,
} from 'lucide-react';
import Button from '../components/Button';
import { useRegistration } from '../context/RegistrationContext';
import { usePerfMode } from '../hooks/usePerfMode';
import {
  PARTNER_CATEGORIES_OFFERINGS,
  PARTNER_INTRO,
  SPONSOR_OFFERING_TIERS,
  SPONSORSHIP_INTRO,
  formatINR,
} from '../data/sponsorOfferings';

type Tab = 'sponsor' | 'partner';

export default function PartnerPage() {
  const { openPartnerModal } = useRegistration();
  const { isMobile, reduceMotion } = usePerfMode();
  const [tab, setTab] = useState<Tab>('sponsor');

  return (
    <div
      className="relative min-h-[100dvh] overflow-x-hidden"
      style={{ color: 'var(--text-primary)' }}
    >
      {!isMobile && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 top-16 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -left-16 bottom-20 h-80 w-80 rounded-full bg-orange-400/15 blur-3xl" />
        </div>
      )}

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-[calc(7.5rem+env(safe-area-inset-bottom))] pt-[7.25rem] sm:px-6 sm:pb-24 sm:pt-28 md:pt-32">
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
              Partner with us
            </p>
            <h1 className="font-heading text-[1.35rem] font-bold leading-snug sm:text-3xl md:text-5xl">
              Sponsorship & partnership offerings
            </h1>
            <p
              className="mt-2.5 text-xs leading-relaxed sm:mt-4 sm:text-base md:text-lg"
              style={{ color: 'var(--text-secondary)' }}
            >
              Review the benefits for each category, then continue to the application form.
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

        <div className="clay-pill mt-6 grid w-full grid-cols-2 gap-1.5 rounded-2xl p-1.5 sm:mt-8 sm:max-w-md">
          <button
            type="button"
            onClick={() => setTab('sponsor')}
            className={`flex min-h-11 items-center justify-center gap-2 rounded-xl px-2 py-3 text-sm font-semibold transition-colors sm:px-3 ${
              tab === 'sponsor' ? 'bg-accent text-white' : ''
            }`}
            style={tab === 'sponsor' ? undefined : { color: 'var(--text-secondary)' }}
          >
            <Banknote className="h-4 w-4 shrink-0" />
            Sponsor
          </button>
          <button
            type="button"
            onClick={() => setTab('partner')}
            className={`flex min-h-11 items-center justify-center gap-2 rounded-xl px-2 py-3 text-sm font-semibold transition-colors sm:px-3 ${
              tab === 'partner' ? 'bg-accent text-white' : ''
            }`}
            style={tab === 'partner' ? undefined : { color: 'var(--text-secondary)' }}
          >
            <Handshake className="h-4 w-4 shrink-0" />
            Partner
          </button>
        </div>

        <motion.div
          key={tab}
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25 }}
          className="mt-6 sm:mt-8"
        >
          {tab === 'sponsor' ? (
            <>
              <p className="max-w-4xl text-sm leading-relaxed sm:text-base" style={{ color: 'var(--text-secondary)' }}>
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
                        From {formatINR(tier.suggestedAmount)}
                      </span>
                    </div>
                    <ul className="mt-4 flex-1 space-y-2 sm:mt-5 sm:space-y-2.5">
                      {tier.offerings.map((item) => (
                        <li key={item} className="flex gap-2.5 text-xs leading-relaxed sm:gap-3 sm:text-sm">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                          <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 sm:mt-auto sm:pt-6">
                      <Button
                        className="w-full"
                        icon={<ArrowRight className="h-4 w-4" />}
                        onClick={() => openPartnerModal('sponsor')}
                      >
                        Apply as {tier.type}
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="max-w-4xl text-sm leading-relaxed sm:text-base" style={{ color: 'var(--text-secondary)' }}>
                {PARTNER_INTRO}
              </p>

              <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 md:grid-cols-3">
                {PARTNER_CATEGORIES_OFFERINGS.map((item) => (
                  <article
                    key={item.category}
                    className="clay-card rounded-[20px] p-5 sm:rounded-[24px] sm:p-6"
                  >
                    <h2 className="font-heading text-base font-bold sm:text-xl">{item.category}</h2>
                    <ul className="mt-4 space-y-2 sm:mt-5 sm:space-y-2.5">
                      {item.offerings.map((offering) => (
                        <li key={offering} className="flex gap-2.5 text-xs leading-relaxed sm:gap-3 sm:text-sm">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                          <span style={{ color: 'var(--text-secondary)' }}>{offering}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>

              <div className="mt-6 hidden sm:mt-8 sm:block">
                <Button
                  size="lg"
                  icon={<ArrowRight className="h-5 w-5" />}
                  onClick={() => openPartnerModal('partner')}
                >
                  Continue to partner form
                </Button>
              </div>
            </>
          )}
        </motion.div>

        <p className="mt-8 text-sm leading-relaxed sm:mt-10" style={{ color: 'var(--text-muted)' }}>
          Registering as a startup, visitor, or speaker?{' '}
          <Link href="/register" className="font-semibold text-accent hover:underline">
            Read registration guidelines
          </Link>
        </p>
      </div>

      {/* Mobile sticky CTA */}
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
          icon={<ArrowRight className="h-4 w-4" />}
          onClick={() => openPartnerModal(tab)}
        >
          {tab === 'sponsor' ? 'Apply as Sponsor' : 'Continue to partner form'}
        </Button>
      </div>
    </div>
  );
}
