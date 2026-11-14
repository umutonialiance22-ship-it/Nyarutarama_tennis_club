const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// Adjust these paths to match your Django URLs.
const ENDPOINTS = {
  register: '/api/auth/register/',
  login: '/api/auth/login/',
  logout: '/api/auth/logout/',
  me: '/api/auth/me/',
}

export class ApiError extends Error {
  constructor(message, status = 0, fieldErrors = {}) {
    super(message)
    this.status = status
    this.fieldErrors = fieldErrors
  }
}

// Maps Django field names to this app's field names
const FIELD_MAP = {
  full_name: 'fullName',
  name: 'fullName',
  email: 'email',
  phone: 'phone',
  phone_number: 'phone',
  password: 'password',
}

function parseFieldErrors(data) {
  const out = {}
  if (!data || typeof data !== 'object') return out
  for (const [key, value] of Object.entries(data)) {
    const field = FIELD_MAP[key]
    if (!field) continue
    out[field] = Array.isArray(value) ? value[0] : String(value)
  }
  return out
}

export async function request(path, { method = 'GET', body } = {}) {
  let res
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      credentials: 'include', // browser sends the secure session cookie, no tokens kept in JS
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new ApiError('We could not reach the server. Please check your connection and try again.')
  }

  let data = null
  try {
    data = await res.json()
  } catch {
    /* empty response body */
  }

  if (!res.ok) {
    throw new ApiError(
      data?.detail || 'Something went wrong. Please try again.',
      res.status,
      parseFieldErrors(data)
    )
  }
  return data
}

// No role is ever sent: the backend gives every public registration the CUSTOMER role.
export function register({ fullName, email, phone, password }) {
  return request(ENDPOINTS.register, {
    method: 'POST',
    body: { full_name: fullName, email, phone, password },
  })
}

export function login({ email, password }) {
  return request(ENDPOINTS.login, { method: 'POST', body: { email, password } })
}

export function logoutRequest() {
  return request(ENDPOINTS.logout, { method: 'POST' })
}

// Asks the backend who is signed in (permissions are decided by the backend only)
export function getCurrentUser() {
  return request(ENDPOINTS.me)
}