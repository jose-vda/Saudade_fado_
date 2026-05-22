# Saudade-e-fado
# Saudade_fado_

## Lead delivery

Reservation, contact, and event forms post to `POST /api/leads`. The route sends
the lead email through the Resend HTTP API.

Configure the deployment environment from `.env.example`:

- `RESEND_API_KEY`
- `LEAD_FROM_EMAIL`
- `LEAD_TO_EMAIL`

`LEAD_FROM_EMAIL` must use a sender address allowed by the Resend account.
Without these values, the route returns `503` and the forms show a recoverable
error state instead of claiming the request was delivered.
