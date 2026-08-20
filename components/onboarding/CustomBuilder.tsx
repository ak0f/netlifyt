'use client'

import { useState } from 'react'
import { CUSTOM_BLOCKS, chf, getCustomBlock, type CustomBlockId } from '@/lib/onboarding'
import type { Lang, T } from '@/lib/i18n'
import { DISPLAY_FONT, eyebrowStyle, hintStyle, optionStyle } from './ui'

/**
 * Bausteine links, das eigene System rechts. Ziehen ist der schnellere Weg
 * auf dem Desktop, Antippen der einzige auf dem Handy, deshalb funktionieren
 * beide.
 */
export default function CustomBuilder({
  blockIds,
  onToggle,
  t,
  lang,
}: {
  blockIds: CustomBlockId[]
  onToggle: (id: CustomBlockId) => void
  t: T['onboarding']['config']
  lang: Lang
}) {
  const [dragOver, setDragOver] = useState(false)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(230px, 100%), 1fr))', gap: '1rem', alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        {CUSTOM_BLOCKS.map(block => {
          const active = blockIds.includes(block.id)
          return (
            <button
              key={block.id}
              type="button"
              aria-pressed={active}
              draggable
              onDragStart={e => e.dataTransfer.setData('text/plain', block.id)}
              onClick={() => onToggle(block.id)}
              style={{
                ...optionStyle(active, 11),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem',
                padding: '0.7rem 0.9rem',
                cursor: 'grab',
              }}
            >
              <span style={{ fontSize: '13.5px' }}>{block.name[lang]}</span>
              <span style={{ flex: 'none', fontSize: '12.5px', color: 'rgba(255,255,255,0.55)' }}>
                +{chf(block.monthly, lang)}{t.perMonthShort}
              </span>
            </button>
          )
        })}
      </div>

      <div
        onDragOver={e => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => {
          e.preventDefault()
          setDragOver(false)
          const id = e.dataTransfer.getData('text/plain') as CustomBlockId
          if (getCustomBlock(id) && !blockIds.includes(id)) onToggle(id)
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          border: `1px dashed rgba(255,255,255,${dragOver ? 0.45 : 0.16})`,
          borderRadius: '14px',
          background: dragOver ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)',
          padding: '1rem',
          transition: `background 0.2s var(--ease), border-color 0.2s var(--ease)`,
        }}
      >
        <span style={eyebrowStyle}>{t.builderTitle}</span>
        <span style={{ fontFamily: DISPLAY_FONT, fontSize: '30px', lineHeight: 1.1, marginTop: '0.35rem' }}>
          {blockIds.length}
        </span>
        <span style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.45)' }}>
          {blockIds.length === 1 ? t.builderBlock : t.builderBlocks}
        </span>
        <p style={{ ...hintStyle, marginTop: '0.75rem', lineHeight: 1.55 }}>{t.builderHint}</p>

        {blockIds.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.85rem' }}>
            {blockIds.map(id => {
              const block = getCustomBlock(id)
              if (!block) return null
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onToggle(id)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem',
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)',
                    borderRadius: '8px', padding: '5px 9px', fontFamily: 'inherit', fontSize: '12px',
                    color: 'rgba(255,255,255,0.75)', cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{block.name[lang]}</span>
                  <span aria-hidden style={{ flex: 'none', opacity: 0.6 }}>✕</span>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
