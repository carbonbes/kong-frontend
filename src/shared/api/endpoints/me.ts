import { client } from '../client'

export const me = () => {
  return client('/auth/me', { method: 'GET' })
}
