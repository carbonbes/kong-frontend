import { createClient } from '../'
import type { UserGender } from '~/shared/model'

interface SignupOptions {
  email: string
  name: string
  gender: keyof typeof UserGender
}

export const signup = (options: SignupOptions) => {
  const client = createClient()

  return client('/auth/signup', { method: 'POST', body: options })
}
