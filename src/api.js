// Empty string means "same origin" — correct in production, where the
// Express server serves both the built frontend and the API. Local dev sets
// VITE_API_BASE_URL (see .env) since the frontend and API run on different
// ports there.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

async function request(path, options) {
  let response
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })
  } catch {
    throw new Error('Could not reach the DugsonTech server. Is it running?')
  }

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error(body.error || `Request failed (${response.status}).`)
  }

  return response.json()
}

export function createOrder({ cart, address, paymentMethod }) {
  return request('/api/orders', {
    method: 'POST',
    body: JSON.stringify({ cart, address, paymentMethod }),
  })
}

export function confirmOrder(orderId) {
  return request(`/api/orders/${orderId}/confirm`, { method: 'POST' })
}

export function getOrder(orderId) {
  return request(`/api/orders/${orderId}`)
}
