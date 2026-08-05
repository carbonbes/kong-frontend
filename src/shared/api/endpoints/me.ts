import { createClient } from '../client'
import type { User } from '~/shared/model'

export const me = (): Promise<User> => {
  const client = createClient()

  return client('/auth/me', { method: 'GET' })
}
