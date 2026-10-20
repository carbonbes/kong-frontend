import type { UserGender } from '~/shared/model'

export interface SignupOptions {
  email: string
  name: string
  gender: keyof typeof UserGender
}

export const signup = (options: SignupOptions) => {
  const { $api } = useNuxtApp()

  return $api('/auth/signup', { method: 'POST', body: options })
}
