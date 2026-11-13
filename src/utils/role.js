export const ROLES = {
  CUSTOMER: 'CUSTOMER',
  COACH: 'COACH',
  OPERATIONS_MANAGER: 'OPERATIONS_MANAGER',
}

// Where each role lands
const ROLE_HOME = {
  CUSTOMER: '/courts', // Court Availability (to be built)
  COACH: '/coach', // Coach Dashboard (to be built)
  OPERATIONS_MANAGER: '/manager', // Manager Dashboard (to be built)
}

// Which pages each role may open (frontend convenience only, Django enforces the real rules)
const ROLE_ROUTES = {
  CUSTOMER: ['/courts'],
  COACH: ['/coach'],
  OPERATIONS_MANAGER: ['/manager'],
}

export function normalizeRole(user) {
  return String(user?.role ?? '').toUpperCase()
}

export function homeForUser(user) {
  return ROLE_HOME[normalizeRole(user)] || '/'
}

// Only allow in-app paths (blocks things like "//evil.com")
function safePath(p) {
  return typeof p === 'string' && p.startsWith('/') && !p.startsWith('//') ? p : null
}

export function canAccess(user, path) {
  const prefixes = ROLE_ROUTES[normalizeRole(user)] || []
  const clean = path.split(/[?#]/)[0]
  return prefixes.some((p) => clean === p || clean.startsWith(`${p}/`))
}

// Remembered destination if this role may open it, otherwise the role's own home
export function resolveDestination(user, from) {
  const target = safePath(from)
  if (target && canAccess(user, target)) return target
  return homeForUser(user)
}   