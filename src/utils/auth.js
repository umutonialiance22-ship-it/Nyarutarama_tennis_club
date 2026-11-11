// Temporary check. Replace with real authentication later.
export function isLoggedIn() {
  try {
    return Boolean(localStorage.getItem('token'))
  } catch {
    return false
  }
}