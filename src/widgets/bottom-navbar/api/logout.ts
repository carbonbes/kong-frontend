import { createClient } from '~/shared/api'

export const logout = () => {
  const client = createClient()

  const refreshToken = useCookie('kong_refresh_token').value

  return client('/auth/logout', { method: 'POST', body: { refreshToken } })
}
