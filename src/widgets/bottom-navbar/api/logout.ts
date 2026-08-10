import { createClient } from '~/shared/api'

export const logout = () => {
  const client = createClient()

  return client('/auth/logout', { method: 'POST' })
}
