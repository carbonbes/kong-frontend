import { createClient } from '../client'

export const logout = () => {
  const client = createClient()

  return client('/auth/logout', { method: 'POST' })
}
