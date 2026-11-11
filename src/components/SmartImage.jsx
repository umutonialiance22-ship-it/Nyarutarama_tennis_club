import { useState } from 'react'
import ImagePlaceholder from './ImagePlaceholder'

// Shows the real photo, and falls back to the placeholder if the file is missing.
export default function SmartImage({ src, alt, label, className = '', imgClassName = '' }) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return <ImagePlaceholder label={label || alt} className={className} />
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  )
}