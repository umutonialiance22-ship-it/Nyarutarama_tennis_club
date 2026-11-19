// Works in a published build when VITE_PREVIEW_MODE=true is set on the host
export const PREVIEW_MODE = import.meta.env.VITE_PREVIEW_MODE === 'true'

// Sample-data mode: the prototype link, or your own computer with VITE_DEMO_MODE=true
export const DEMO_ENABLED = PREVIEW_MODE || (import.meta.env.DEV && import.meta.env.VITE_DEMO_MODE === 'true')