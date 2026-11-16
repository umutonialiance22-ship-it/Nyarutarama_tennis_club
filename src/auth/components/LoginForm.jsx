import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TextField from './components/TextField'
import PasswordInput from './components/PasswordInput'
import GoogleButton from './GoogleButton'
import Notice from './Notice'
import { useAuth } from '../../context/AuthContext'
import { useLang } from '../../context/LanguageContext'
import { login, ApiError } from '../../services/authService'
import { errorText } from '../../utils/errors'
import { resolveDestination } from '../../utils/role'
import { validateLogin } from '../../utils/validation'

export default function LoginForm({ from, registered, prefillEmail, onSwitch }) {
  const navigate = useNavigate()
  const { refresh } = useAuth()
  const { t } = useLang()

  const [values, setValues] = useState({ email: prefillEmail || '', password: '' })
  const [touched, setTouched] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [googleNotice, setGoogleNotice] = useState(false)

  const errors = validateLogin(values)
  const isValid = Object.keys(errors).length === 0
  const showError = (f) => (touched[f] && errors[f] ? t(errors[f]) : '')

  const handleChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }))
  const handleBlur = (e) => setTouched((s) => ({ ...s, [e.target.name]: true }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return
    setTouched({ email: true, password: true })
    if (!isValid) return

    setSubmitting(true)
    setFormError('')
    try {
      await login({ email: values.email.trim().toLowerCase(), password: values.password })
      const me = await refresh()
      if (!me) throw new ApiError('', 0, {}, 'signin_failed')
      navigate(resolveDestination(me, from), { replace: true })
    } catch (err) {
      setFormError(
        err.status === 400 || err.status === 401
          ? t('Incorrect email or password. Please try again.')
          : errorText(err, t)
      )
      setValues((v) => ({ ...v, password: '' }))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {registered && <Notice type="success">{t('Your account was created successfully. Please log in below.')}</Notice>}
      {formError && <Notice type="error">{formError}</Notice>}

      <TextField
        label={t('Email address')}
        id="login-email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={showError('email')}
        required
      />

      <div>
        <PasswordInput
          label={t('Password')}
          id="login-password"
          name="password"
          autoComplete="current-password"
          placeholder={t('Enter your password')}
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={showError('password')}
          required
        />
        <div className="mt-2 text-right">
          <Link to="/forgot-password" className="text-sm font-medium text-flame-dark hover:underline">
            {t('Forgot password?')}
          </Link>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting || !isValid}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-ball py-3 font-semibold text-night transition hover:shadow-lg hover:shadow-ball/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none"
      >
        {submitting && <span className="h-4 w-4 animate-spin rounded-full border-2 border-night/30 border-t-night" />}
        {submitting ? t('Logging in...') : t('Login')}
      </button>

      <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-night/40">
        <span className="h-px flex-1 bg-black/10" />
        {t('or')}
        <span className="h-px flex-1 bg-black/10" />
      </div>

      <GoogleButton onClick={() => setGoogleNotice(true)} />
      {googleNotice && (
        <Notice type="info">
          {t('Google sign-in is a placeholder for now and will work once the backend is connected. Please use your email and password.')}
        </Notice>
      )}

      <p className="text-center text-sm text-night/70">
        {t("Don't have an account?")}{' '}
        <button type="button" onClick={() => onSwitch('register')} className="font-semibold text-flame-dark hover:underline">
          {t('Create one')}
        </button>
      </p>
    </form>
  )
}