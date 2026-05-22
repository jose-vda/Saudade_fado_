import { NextResponse } from 'next/server'
import type { LeadLanguage, LeadPayload } from '@/lib/leads'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

type UnknownRecord = Record<string, unknown>

function cleanText(value: unknown, maxLength = 120) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function isLang(value: unknown): value is LeadLanguage {
  return value === 'pt' || value === 'en'
}

function parseLead(input: unknown): LeadPayload | null {
  if (!input || typeof input !== 'object') return null

  const payload = input as UnknownRecord
  const name = cleanText(payload.name)
  const email = cleanText(payload.email).toLowerCase()
  const lang = isLang(payload.lang) ? payload.lang : null

  if (!name || !EMAIL_PATTERN.test(email) || !lang) return null

  if (payload.kind === 'contact') {
    const message = cleanText(payload.message, 1600)
    return message ? { kind: 'contact', lang, name, email, message } : null
  }

  if (payload.kind === 'reservation') {
    const date = cleanText(payload.date, 10)
    const guests = cleanText(payload.guests, 80)

    if (!DATE_PATTERN.test(date) || !guests) return null

    return {
      kind: 'reservation',
      lang,
      name,
      email,
      date,
      guests,
      phone: cleanText(payload.phone, 80) || undefined,
      notes: cleanText(payload.notes, 800) || undefined,
    }
  }

  if (payload.kind === 'event') {
    const eventType = cleanText(payload.eventType, 120)
    const eventDate = cleanText(payload.eventDate, 10)

    if (!eventType || (eventDate && !DATE_PATTERN.test(eventDate))) return null

    return {
      kind: 'event',
      lang,
      name,
      email,
      eventType,
      company: cleanText(payload.company, 160) || undefined,
      eventDate: eventDate || undefined,
      guestCount: cleanText(payload.guestCount, 60) || undefined,
      message: cleanText(payload.message, 1200) || undefined,
    }
  }

  return null
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function field(label: string, value?: string) {
  if (!value) return ''
  return `${label}: ${value}\n`
}

function emailText(lead: LeadPayload) {
  const common = [
    field('Origem', lead.kind),
    field('Idioma', lead.lang),
    field('Nome', lead.name),
    field('Email', lead.email),
  ].join('')

  if (lead.kind === 'contact') {
    return `${common}${field('Mensagem', lead.message)}`
  }

  if (lead.kind === 'reservation') {
    return [
      common,
      field('Data', lead.date),
      field('Convidados', lead.guests),
      field('Telefone', lead.phone),
      field('Notas', lead.notes),
    ].join('')
  }

  return [
    common,
    field('Empresa', lead.company),
    field('Tipo de evento', lead.eventType),
    field('Data do evento', lead.eventDate),
    field('Convidados', lead.guestCount),
    field('Mensagem', lead.message),
  ].join('')
}

function emailHtml(lead: LeadPayload) {
  return `<pre style="font: 15px/1.5 system-ui, sans-serif; white-space: pre-wrap;">${escapeHtml(emailText(lead))}</pre>`
}

function subjectFor(lead: LeadPayload) {
  if (lead.kind === 'reservation') return `Pedido de reserva - ${lead.date}`
  if (lead.kind === 'event') return `Pedido de evento - ${lead.eventType}`
  return `Pedido de contacto - ${lead.name}`
}

export async function POST(request: Request) {
  let input: unknown

  try {
    input = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  const lead = parseLead(input)
  if (!lead) {
    return NextResponse.json({ error: 'Invalid lead payload.' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.LEAD_FROM_EMAIL
  const to = process.env.LEAD_TO_EMAIL

  if (!apiKey || !from || !to) {
    return NextResponse.json({ error: 'Lead delivery is not configured.' }, { status: 503 })
  }

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: lead.email,
      subject: subjectFor(lead),
      text: emailText(lead),
      html: emailHtml(lead),
    }),
  })

  if (!resendResponse.ok) {
    return NextResponse.json({ error: 'Unable to deliver lead.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
