'use client'

import { useEffect } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'

/* ── Cal.com inline booking widget ──
   Booking link:  https://cal.eu/slideagentur/erstgesprach
   The 15-minute slot length is configured on the Cal.com event type itself
   ("erstgesprach"), not here. To change the booking, update CAL_LINK / CAL_ORIGIN. */
const CAL_LINK = 'slideagentur/erstgesprach'
const CAL_NAMESPACE = 'erstgesprach'
const CAL_ORIGIN = 'https://cal.eu' // EU data region

export default function CalEmbed() {
  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE })
      cal('ui', {
        theme: 'dark',
        hideEventTypeDetails: false,
        layout: 'month_view',
        cssVarsPerTheme: {
          light: { 'cal-brand': '#ffffff' },
          dark: { 'cal-brand': '#ffffff' },
        },
      })
    })()
  }, [])

  return (
    <Cal
      namespace={CAL_NAMESPACE}
      calLink={CAL_LINK}
      calOrigin={CAL_ORIGIN}
      style={{ width: '100%', height: '100%', overflow: 'scroll' }}
      config={{ layout: 'month_view', useSlotsViewOnSmallScreen: 'true' }}
    />
  )
}
