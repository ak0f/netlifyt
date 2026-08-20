'use client'

import { ADDONS, PACKAGES, chf, type AddonId, type CustomBlockId, type PackageId } from '@/lib/onboarding'
import type { Lang, T } from '@/lib/i18n'
import type { WizardState } from './OnboardingWizard'
import RecommendationQuiz from './RecommendationQuiz'
import IntegrationList from './IntegrationList'
import CustomBuilder from './CustomBuilder'
import {
  CheckBox, DISPLAY_FONT, NavRow, Pill, Segmented, StepShell, Tick,
  eyebrowStyle, optionStyle, stepHeadingStyle, subTextStyle,
} from './ui'

export default function StepConfig({
  state,
  patch,
  onBack,
  onNext,
  canAdvance,
  t,
  lang,
}: {
  state: WizardState
  patch: (partial: Partial<WizardState>) => void
  onBack: () => void
  onNext: () => void
  canAdvance: boolean
  t: T['onboarding']
  lang: Lang
}) {
  const c = t.config
  const showAddons = state.configMode === 'standard' && state.packageId !== 'system'

  function toggle<Id extends string>(list: Id[], id: Id): Id[] {
    return list.includes(id) ? list.filter(x => x !== id) : [...list, id]
  }

  return (
    <StepShell>
      <div>
        <h2 style={stepHeadingStyle}>{c.heading}</h2>
        <p style={subTextStyle}>{c.sub}</p>
      </div>

      <Segmented
        label={c.heading}
        value={state.configMode}
        onChange={mode => patch({ configMode: mode })}
        options={[
          { value: 'standard' as const, label: c.tabStandard },
          { value: 'custom' as const, label: c.tabCustom },
        ]}
      />

      {state.configMode === 'standard' ? (
        <>
          <RecommendationQuiz onPick={id => patch({ packageId: id })} t={c} lang={lang} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {PACKAGES.map(pkg => {
              const active = state.packageId === pkg.id
              return (
                <button
                  key={pkg.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => patch({ packageId: pkg.id as PackageId })}
                  style={{ ...optionStyle(active, 16), padding: '1.15rem 1.25rem' }}
                >
                  <span style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: '0.5rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                      <span style={{ fontFamily: DISPLAY_FONT, fontSize: '18px', letterSpacing: '-0.01em' }}>
                        {pkg.name[lang]}
                      </span>
                      {pkg.badge && <Pill strong>{pkg.badge[lang]}</Pill>}
                    </span>
                    <span style={{ textAlign: 'right' }}>
                      <span style={{ display: 'block', fontSize: '15px' }}>{chf(pkg.oneTime, lang)}</span>
                      <span style={{ display: 'block', fontSize: '11.5px', color: 'rgba(255,255,255,0.45)' }}>
                        {c.from} {chf(pkg.monthlyFrom, lang)}{c.perMonthShort}
                      </span>
                    </span>
                  </span>

                  <span style={{ display: 'block', marginTop: '0.35rem', fontSize: '13px', color: 'rgb(178,178,178)' }}>
                    {pkg.tagline[lang]}
                  </span>

                  <span style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.9rem' }}>
                    {pkg.features[lang].map(f => (
                      <span key={f} style={{ display: 'flex', gap: '0.5rem', fontSize: '12.5px', color: 'rgba(255,255,255,0.7)' }}>
                        <Tick />
                        {f}
                      </span>
                    ))}
                  </span>

                  <span style={{ display: 'block', marginTop: '0.85rem', fontSize: '11.5px', color: 'rgba(255,255,255,0.4)' }}>
                    {pkg.footnote[lang]}
                  </span>
                </button>
              )
            })}
          </div>

          {showAddons && (
            <div>
              <span style={{ ...eyebrowStyle, marginBottom: '0.75rem' }}>{c.addonsTitle}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {ADDONS.map(addon => {
                  const active = state.addonIds.includes(addon.id)
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => patch({ addonIds: toggle<AddonId>(state.addonIds, addon.id) })}
                      style={{
                        ...optionStyle(active, 11),
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        gap: '0.75rem', padding: '0.7rem 0.9rem',
                      }}
                    >
                      <span style={{ display: 'flex', minWidth: 0, alignItems: 'center', gap: '0.6rem' }}>
                        <CheckBox checked={active} />
                        <span style={{ minWidth: 0 }}>
                          <span style={{ display: 'block', fontSize: '13.5px' }}>{addon.name[lang]}</span>
                          <span style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>
                            {addon.description[lang]}
                          </span>
                        </span>
                      </span>
                      <span style={{ flex: 'none', fontSize: '12.5px', color: 'rgba(255,255,255,0.55)', whiteSpace: 'nowrap' }}>
                        +{chf(addon.oneTime, lang)} · +{chf(addon.monthly, lang)}{c.perMonthShort}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </>
      ) : (
        <CustomBuilder
          blockIds={state.blockIds}
          onToggle={id => patch({ blockIds: toggle<CustomBlockId>(state.blockIds, id) })}
          t={c}
          lang={lang}
        />
      )}

      <IntegrationList
        selectedIds={state.integrationIds}
        onToggle={id => patch({ integrationIds: toggle(state.integrationIds, id) })}
        t={c}
        lang={lang}
      />

      <Segmented
        label={t.review.rowBilling}
        value={state.billing}
        onChange={billing => patch({ billing })}
        options={[
          { value: 'monthly' as const, label: c.billingMonthly },
          { value: 'yearly' as const, label: c.billingYearly },
        ]}
      />

      <NavRow onBack={onBack} backLabel={t.back} onNext={onNext} nextLabel={t.next} nextDisabled={!canAdvance} />
    </StepShell>
  )
}
