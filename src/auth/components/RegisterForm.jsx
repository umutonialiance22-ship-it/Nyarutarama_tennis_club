import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TextField from './components/TextField'
import PasswordInput from './components/PasswordInput'
import PasswordStrength from './PasswordStrength'
import GoogleButton from './GoogleButton'
import Notice from './Notice'
import { useAuth } from '../../context/AuthContext'
import { useLang } from '../../context/LanguageContext'
import { login, register } from '../../services/authService'
import { errorText } from '../../utils/errors'
import { resolveDestination } from '../../utils/role'
import { validateRegister } from '../../utils/validation'

const initial = { fullName: '', email: '', phone: '', password: '', confirmPassword: '', acceptTerms: false }

export default function RegisterForm({ from, onSwitch }) {
  const navigate = useNavigate()
  const { refresh } = useAuth()
  const { t } = useLang()

  const [values, setValues] = useState(initial)
  const [touched, setTouched] = useState({})
  const [serverErrors, setServerErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [googleNotice, setGoogleNotice] = useState(false)
  const [emailSelected, setEmailSelected] = useState(false)

  const errors = validateRegister(values)
  const isValid = Object.keys(errors).length === 0
  const showError = (f) => {
    const e = serverErrors[f] || (touched[f] ? errors[f] : '')
    return e ? t(e) : ''
  }

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target
    setValues((v) => ({ ...v, [name]: type === 'checkbox' ? checked : value }))
    if (serverErrors[name]) setServerErrors((s) => ({ ...s, [name]: '' }))
    if (type === 'checkbox') setTouched((s) => ({ ...s, [name]: true }))
  }
  const handleBlur = (e) => setTouched((s) => ({ ...s, [e.target.name]: true }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return
    setTouched({ fullName: true, email: true, phone: true, password: true, confirmPassword: true, acceptTerms: true })
    if (!isValid) return

    setSubmitting(true)
    setFormError('')
    setServerErrors({})
    try {
      const email = values.email.trim().toLowerCase()
      await register({
        fullName: values.fullName.trim(),
        email,
        phone: values.phone.trim(),
        password: values.password,
      })

      // Sign them in automatically so they continue to where they were going
      try {
        await login({ email, password: values.password })
        const me = await refresh()
        if (me) {
          navigate(resolveDestination(me, from), { replace: true })
          return
        }
      } catch {
        /* auto sign-in not possible: fall back to the login page below */
      }
      navigate('/login', { replace: true, state: { registered: true, email, from } })
    } catch (err) {
      if (err.fieldErrors && Object.keys(err.fieldErrors).length) {
        setServerErrors(err.fieldErrors)
        setFormError(t('Please fix the highlighted fields.'))
      } else {
        setFormError(errorText(err, t))
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {formError && <Notice type="error">{formError}</Notice>}

      {!emailSelected && (
        <div className="space-y-3">
          <GoogleButton onClick={() => setGoogleNotice(true)} />
          <button
            type="button"
            onClick={() => {
              setEmailSelected(true)
              setGoogleNotice(false)
            }}
            className="w-full rounded-xl bg-ball px-4 py-3 text-sm font-semibold text-night transition hover:shadow-lg hover:shadow-ball/40"
          >
            {t('Continue with email')}
          </button>
          {googleNotice && (
            <Notice type="info">
              {t('Google sign-up is a placeholder for now and will work once the backend is connected. Please register with your email.')}
            </Notice>
          )}
        </div>
      )}

      <div className={emailSelected ? 'space-y-5' : 'hidden'}>
      <TextField label={t('Full name')} id="reg-name" name="fullName" autoComplete="name" placeholder={t('e.g. Jane Doe')}
        value={values.fullName} onChange={handleChange} onBlur={handleBlur} error={showError('fullName')} required />

      <TextField label={t('Email address')} id="reg-email" name="email" type="email" autoComplete="email" placeholder="you@example.com"
        value={values.email} onChange={handleChange} onBlur={handleBlur} error={showError('email')} required />

      <TextField label={t('Phone number')} id="reg-phone" name="phone" type="tel" autoComplete="tel" placeholder={t('e.g. 07XX XXX XXX')}
        value={values.phone} onChange={handleChange} onBlur={handleBlur} error={showError('phone')} required />

      <div>
        <PasswordInput
          label={t('Password')}
          id="reg-password"
          name="password"
          autoComplete="new-password"
          placeholder={t('Create a strong password')}
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={showError('password')}
          hint={values.password ? undefined : t('Use 8+ characters with upper and lowercase letters and a number.')}
          required
        />
        {values.password && <PasswordStrength password={values.password} />}
      </div>

      <PasswordInput
        label={t('Confirm password')}
        id="reg-confirm"
        name="confirmPassword"
        autoComplete="new-password"
        placeholder={t('Re-enter your password')}
        value={values.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        error={showError('confirmPassword')}
        required
      />

      <div>
        <label className="flex items-start gap-3 text-sm text-night/70">
          <input type="checkbox" name="acceptTerms" checked={values.acceptTerms} onChange={handleChange} className="mt-1 h-4 w-4 accent-flame" />
          <span>
            {t('I accept the')}{' '}
            <Link to="/terms" target="_blank" className="font-medium text-flame-dark hover:underline">
              {t('Terms & Conditions')}
            </Link>{' '}
            {t('and')}{' '}
            <Link to="/privacy" target="_blank" className="font-medium text-flame-dark hover:underline">
              {t('Privacy Policy')}
            </Link>
            .
          </span>
        </label>
        {showError('acceptTerms') && (
          <p role="alert" className="mt-1.5 text-sm text-red-600">
            {showError('acceptTerms')}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting || !isValid}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-ball py-3 font-semibold text-night transition hover:shadow-lg hover:shadow-ball/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none"
      >
        {submitting && <span className="h-4 w-4 animate-spin rounded-full border-2 border-night/30 border-t-night" />}
        {submitting ? t('Creating account...') : t('Register')}
      </button>
      <button
        type="button"
        onClick={() => setEmailSelected(false)}
        className="w-full text-sm font-medium text-flame-dark hover:underline"
      >
        {t('← Back to options')}
      </button>
      </div>

      <p className="text-center text-sm text-night/70">
        {t('Already have an account?')}{' '}
        <button type="button" onClick={() => onSwitch('login')} className="font-semibold text-flame-dark hover:underline">
          {t('Log in')}
        </button>
      </p>
    </form>
  )
}