export function getUserRole(): string | null {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  if (!token) return null

  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join('')
    )
    const payload = JSON.parse(jsonPayload)
    return payload.role
  } catch (e) {
    return null
  }
}
