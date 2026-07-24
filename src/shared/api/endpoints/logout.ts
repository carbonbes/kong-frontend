import { client } from '../client'

export const logout = () => {
  return client('/auth/logout', { method: 'POST' })
}
