import { client } from '../client'
import type { User } from '~/shared/model'

export const me = (): Promise<User> => {
  return client('/auth/me', { method: 'GET' })
}
