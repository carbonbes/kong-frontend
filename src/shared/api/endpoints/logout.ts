import { createClient } from '~/shared/api'

interface LogoutOptions {
  refreshToken: string | null | undefined
}

export const logout = (options: LogoutOptions) => {
  const client = createClient()

  return client('/auth/logout', { method: 'POST', body: options })
}
