export interface SigninOptions {
  email: string
}

export const signin = (options: SigninOptions) => {
  const { $api } = useNuxtApp()

  return $api('/auth/signin', { method: 'POST', body: options })
}
