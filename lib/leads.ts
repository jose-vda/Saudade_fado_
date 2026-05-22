export type LeadLanguage = 'pt' | 'en'

type LeadBase = {
  lang: LeadLanguage
  name: string
  email: string
}

export type ContactLead = LeadBase & {
  kind: 'contact'
  message: string
}

export type ReservationLead = LeadBase & {
  kind: 'reservation'
  date: string
  guests: string
  phone?: string
  notes?: string
}

export type EventLead = LeadBase & {
  kind: 'event'
  company?: string
  eventType: string
  eventDate?: string
  guestCount?: string
  message?: string
}

export type LeadPayload = ContactLead | ReservationLead | EventLead

export async function submitLead(payload: LeadPayload) {
  const response = await fetch('/api/leads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('Lead request failed.')
  }
}
