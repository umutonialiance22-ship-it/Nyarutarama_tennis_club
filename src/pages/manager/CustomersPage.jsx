import { useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useLang } from '../../context/LanguageContext'
import {
  ConfirmDialog,
  Modal,
  PageHeader,
  SearchBox,
  SortHeader,
  StatusBadge,
  inputCls,
  thCls,
  useSort,
} from '../../components/manager/ui'

const GETTERS = { name: (r) => r.name.toLowerCase() }

export default function CustomersPage() {
  const { customers, setCustomers, bookings, notify } = useOutletContext()
  const { t } = useLang()
  const [query, setQuery] = useState('')
  const [membership, setMembership] = useState('all')
  const [selected, setSelected] = useState(null)
  const [vipTarget, setVipTarget] = useState(null)

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    const digits = q.replace(/\s/g, '')
    return customers.filter(
      (c) =>
        (membership === 'all' || c.membership === membership) &&
        (!q || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.phone.replace(/\s/g, '').includes(digits))
    )
  }, [customers, query, membership])
  const { sorted, sort, toggle } = useSort(rows, 'name', 'asc', GETTERS)

  const vipCount = customers.filter((c) => c.membership === 'VIP').length

  const confirmVip = () => {
    const makeVip = vipTarget.membership !== 'VIP'
    setCustomers((prev) => prev.map((c) => (c.id === vipTarget.id ? { ...c, membership: makeVip ? 'VIP' : 'Regular' } : c)))
    notify(
      'success',
      makeVip
        ? t('{name} is now a VIP member and can book the VIP court themselves (demo: they would be notified).', { name: vipTarget.name })
        : t('VIP access removed for {name} (demo: they would be notified).', { name: vipTarget.name })
    )
    setVipTarget(null)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('Customers')}
        subtitle={t('{n} registered customers, {v} VIP. Verify a customer personally, then assign VIP.', { n: customers.length, v: vipCount })}
      />

      <div className="grid gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:grid-cols-2">
        <SearchBox value={query} onChange={setQuery} placeholder={t('Search by name, email or phone')} />
        <select aria-label={t('Filter by membership')} value={membership} onChange={(e) => setMembership(e.target.value)} className={inputCls}>
          <option value="all">{t('All customers')}</option>
          <option value="VIP">VIP</option>
          <option value="Regular">{t('Regular')}</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead className="bg-cream text-night/60">
              <tr>
                <SortHeader label={t('Name')} k="name" sort={sort} toggle={toggle} />
                <th className={thCls}>{t('Email')}</th>
                <th className={thCls}>{t('Phone')}</th>
                <SortHeader label={t('Membership')} k="membership" sort={sort} toggle={toggle} />
                <SortHeader label={t('Status')} k="status" sort={sort} toggle={toggle} />
                <th className={thCls}>{t('Actions')}</th>
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-night/50">{t('No customers found.')}</td>
                </tr>
              )}
              {sorted.map((c) => (
                <tr key={c.id} className="border-t border-black/5 transition hover:bg-cream/60">
                  <td className="px-4 py-3 font-medium text-night">{c.name}</td>
                  <td className="px-4 py-3 text-night/70">{c.email}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-night/70">{c.phone}</td>
                  <td className="px-4 py-3"><StatusBadge status={c.membership} /></td>
                  <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <button onClick={() => setSelected(c)} className="text-sm font-semibold text-flame-dark hover:underline">
                      {t('View details')}
                    </button>
                    <span className="mx-2 text-night/20">|</span>
                    <button
                      onClick={() => setVipTarget(c)}
                      className={`text-sm font-semibold hover:underline ${c.membership === 'VIP' ? 'text-red-600' : 'text-night'}`}
                    >
                      {c.membership === 'VIP' ? t('Remove VIP') : t('Assign VIP')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <Modal title={t('Customer details')} onClose={() => setSelected(null)}>
          <p className="font-display text-xl font-semibold text-night">{selected.name}</p>
          <dl className="mt-4 space-y-3 rounded-2xl bg-cream p-4 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-night/60">{t('Email')}</dt>
              <dd className="break-all text-right font-medium text-night">{selected.email}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-night/60">{t('Phone')}</dt>
              <dd className="font-medium text-night">{selected.phone}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-night/60">{t('Membership')}</dt>
              <dd><StatusBadge status={customers.find((c) => c.id === selected.id)?.membership || selected.membership} /></dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-night/60">{t('Account')}</dt>
              <dd><StatusBadge status={selected.status} /></dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-night/60">{t('Confirmed bookings')}</dt>
              <dd className="font-medium text-night">
                {bookings.filter((b) => b.customer === selected.name && b.status === 'Confirmed').length}
              </dd>
            </div>
          </dl>
          <button onClick={() => setSelected(null)} className="mt-5 w-full rounded-full border border-night/20 py-2.5 text-sm font-semibold text-night hover:border-flame hover:text-flame">
            {t('Close')}
          </button>
        </Modal>
      )}

      {vipTarget && (
        <ConfirmDialog
          title={vipTarget.membership === 'VIP' ? t('Remove VIP access?') : t('Assign VIP access?')}
          message={
            vipTarget.membership === 'VIP'
              ? t('{name} will no longer be able to book the VIP court themselves.', { name: vipTarget.name })
              : t('{name} will be able to book the VIP court (Court 1) themselves. Only do this after you have verified them personally.', { name: vipTarget.name })
          }
          confirmLabel={vipTarget.membership === 'VIP' ? t('Remove VIP') : t('Assign VIP')}
          danger={vipTarget.membership === 'VIP'}
          onConfirm={confirmVip}
          onCancel={() => setVipTarget(null)}
        />
      )}
    </div>
  )
}