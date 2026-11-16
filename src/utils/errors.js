// Shows a translated message for known error codes, otherwise the server's own message
export function errorText(err, t) {
  return err?.code ? t(`err.${err.code}`) : err?.message || t('err.generic')
}