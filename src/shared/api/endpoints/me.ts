import type { User } from '~/shared/model'

export const me = (): Promise<User> => {
  const { $api } = useNuxtApp()

  return $api('/auth/me', { method: 'GET' })
}
