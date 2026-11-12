const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const phoneRegex = /^\+?[0-9\s-]{9,15}$/

export function passwordChecks(pw) {
  return [
    { label: 'At least 8 characters', ok: pw.length >= 8, required: true },
    { label: 'Upper and lowercase letters', ok: /[a-z]/.test(pw) && /[A-Z]/.test(pw), required: true },
    { label: 'At least one number', ok: /\d/.test(pw), required: true },
    { label: 'A symbol, e.g. ! @ # (recommended)', ok: /[^A-Za-z0-9]/.test(pw), required: false },
  ]
}

// 0 = empty, 1 = weak ... 4 = strong
export function passwordStrength(pw) {
  if (!pw) return 0
  const passed = passwordChecks(pw).filter((c) => c.ok).length
  if (pw.length < 8) return 1
  return Math.max(1, Math.min(passed, 4))
}

export function validateLogin(v) {
  const e = {}
  if (!v.email.trim()) e.email = 'Please enter your email address.'
  else if (!emailRegex.test(v.email.trim())) e.email = 'Please enter a valid email address.'
  if (!v.password) e.password = 'Please enter your password.'
  return e
}

export function validateRegister(v) {
  const e = {}
  if (!v.fullName.trim()) e.fullName = 'Please enter your full name.'
  else if (v.fullName.trim().length < 2) e.fullName = 'Your name looks too short.'

  if (!v.email.trim()) e.email = 'Please enter your email address.'
  else if (!emailRegex.test(v.email.trim())) e.email = 'Please enter a valid email address.'

  if (!v.phone.trim()) e.phone = 'Please enter your phone number.'
  else if (!phoneRegex.test(v.phone.trim())) e.phone = 'Please enter a valid phone number.'

  const failed = passwordChecks(v.password).filter((c) => c.required && !c.ok)
  if (!v.password) e.password = 'Please create a password.'
  else if (failed.length) e.password = 'Your password does not meet the requirements below.'

  if (!v.confirmPassword) e.confirmPassword = 'Please confirm your password.'
  else if (v.confirmPassword !== v.password) e.confirmPassword = 'The passwords do not match.'

  if (!v.acceptTerms) e.acceptTerms = 'You need to accept the Terms and Privacy Policy.'
  return e
}