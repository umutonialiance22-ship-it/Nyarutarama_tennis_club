import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import TextField from '../../auth/components/components/TextField'
import Icon from '../../components/manager/Icon'
import { ConfirmDialog, Modal, PageHeader, StatusBadge, thCls } from '../../components/manager/ui'
import { useLang } from '../../context/LanguageContext'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const phoneRegex = /^\+?[0-9\s-]{9,15}$/

function AddCoachModal({ coaches, onClose, onAdd }) {
  const { t } = useLang()
  const [values, setValues] = useState({ name: '', email: '', phone: '' })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }))
    setErrors((er) => ({ ...er, [e.target.name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const er = {}
    if (!values.name.trim()) er.name = 'Please enter the coach’s full name.'
    if (!emailRegex.test(values.email.trim())) er.email = 'Please enter a valid email address.'
    else if (coaches.some((c) => c.email && c.email.toLowerCase() === values.email.trim().toLowerCase()))
      er.email = 'A coach with this email already exists.'
    if (!phoneRegex.test(values.phone.trim())) er.phone = 'Please enter a valid phone number.'
    setErrors(er)
    if (Object.keys(er).length) return
    onAdd({ name: values.name.trim(), email: values.email.trim(), phone: values.phone.trim() })
  }

  const err = (f) => (errors[f] ? t(errors[f]) : '')

  return (
    <Modal title={t('Add coach')} onClose={onClose}>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <TextField label={t('Full name')} id="coach-name" name="name" placeholder={t('e.g. Jane Doe')} value={values.name} onChange={handleChange} error={err('name')} />
        <TextField label={t('Email address')} id="coach-email" name="email" type="email" placeholder="coach@example.com" value={values.email} onChange={handleChange} error={err('email')} />
        <TextField label={t('Phone number')} id="coach-phone" name="phone" type="tel" placeholder={t('e.g. 07XX XXX XXX')} value={values.phone} onChange={handleChange} error={err('phone')} />
        <p className="text-xs text-night/50">{t('The coach would receive an invitation to set up their own password. No password is created here.')}</p>
        <div className="flex gap-3 pt-1">
          <button type="button" onClick={onClose} className="flex-1 rounded-full border border-night/20 py-2.5 text-sm font-semibold text-night hover:border-flame hover:text-flame">
            {t('Cancel')}
          </button>
          <button type="submit" className="flex-1 rounded-full bg-ball py-2.5 text-sm font-semibold text-night transition hover:shadow-lg hover:shadow-ball/40">
            {t('Create coach account')}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default function CoachesPage() {
  const { coaches, setCoaches, notify } = useOutletContext()
  const { t } = useLang()
  const [adding, setAdding] = useState(false)
  const [toToggle, setToToggle] = useState(null)

  const addCoach = (data) => {
    setCoaches((prev) => [...prev, { id: Date.now(), ...data, status: 'Invited' }])
    setAdding(false)
    notify('success', t('Coach account created for {name} (demo: no invitation was actually sent).', { name: data.name }))
  }

  const confirmToggle = () => {
    const activating = toToggle.status === 'Inactive'
    setCoaches((prev) => prev.map((c) => (c.id === toToggle.id ? { ...c, status: activating ? 'Active' : 'Inactive' } : c)))
    notify('success', t(activating ? '{name} is now active.' : '{name} is now inactive.', { name: toToggle.name }))
    setToToggle(null)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('Coaches')}
        subtitle={t('Coach accounts are created by the Operations Manager.')}
        action={
          <button
            onClick={() => setAdding(true)}
            className="inline-flex items-center gap-2 rounded-full bg-ball px-5 py-2.5 text-sm font-semibold text-night transition hover:shadow-lg hover:shadow-ball/40"
          >
            <Icon name="plus" className="h-4 w-4" /> {t('Add Coach')}
          </button>
        }
      />

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead className="bg-cream text-night/60">
              <tr>
                <th className={thCls}>{t('Coach')}</th>
                <th className={thCls}>{t('Contact')}</th>
                <th className={thCls}>{t('Status')}</th>
                <th className={thCls}>{t('Actions')}</th>
              </tr>
            </thead>
            <tbody>
              {coaches.map((c) => (
                <tr key={c.id} className="border-t border-black/5 transition hover:bg-cream/60">
                  <td className="px-4 py-3 font-medium text-night">{c.name}</td>
                  <td className="px-4 py-3 text-night/70">
                    <a href={`tel:${c.phone.replace(/\s/g, '')}`} className="hover:text-flame">{c.phone}</a>
                    {c.email && <p className="text-xs text-night/50">{c.email}</p>}
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                  <td className="px-4 py-3">
                    <button onClick={() => setToToggle(c)} className="text-sm font-semibold text-flame-dark hover:underline">
                      {c.status === 'Inactive' ? t('Activate') : t('Deactivate')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {adding && <AddCoachModal coaches={coaches} onClose={() => setAdding(false)} onAdd={addCoach} />}

      {toToggle && (
        <ConfirmDialog
          title={toToggle.status === 'Inactive' ? t('Activate this coach?') : t('Deactivate this coach?')}
          message={
            toToggle.status === 'Inactive'
              ? t('{name} will be able to use their account again.', { name: toToggle.name })
              : t('{name} will no longer be able to use their account until you activate it again.', { name: toToggle.name })
          }
          confirmLabel={toToggle.status === 'Inactive' ? t('Activate') : t('Deactivate')}
          danger={toToggle.status !== 'Inactive'}
          onConfirm={confirmToggle}
          onCancel={() => setToToggle(null)}
        />
      )}
    </div>
  )
}