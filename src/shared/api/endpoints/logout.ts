export const logout = (): Promise<void> => {
  const { $api } = useNuxtApp()

  return $api('/auth/logout', { method: 'POST' })
}
