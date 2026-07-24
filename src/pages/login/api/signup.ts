import { client } from '~/shared/api'
import type { UserGender } from '~/shared/model'

interface SignupOptions {
  email: string
  name: string
  gender: keyof typeof UserGender
}

export const signup = (options: SignupOptions) => {
  return client('/auth/signup', { method: 'POST', body: options })
}
