import { useState } from 'react'
import TextField from './TextField'

const EyeIcon = ({ off }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
    <circle cx="12" cy="12" r="3" />
    {off && <path d="M4 4l16 16" />}
  </svg>
)

export default function PasswordInput(props) {
  const [show, setShow] = useState(false)

  return (
    <TextField
      {...props}
      type={show ? 'text' : 'password'}
      endAdornment={
        <button
          type="button"
          onClick={() => setShow(!show)}
          aria-label={show ? 'Hide password' : 'Show password'}
          aria-pressed={show}
          className="rounded-md p-1 text-night/50 transition hover:text-flame focus:outline-none focus-visible:ring-2 focus-visible:ring-flame/40"
        >
          <EyeIcon off={show} />
        </button>
      }
    />
  )
}