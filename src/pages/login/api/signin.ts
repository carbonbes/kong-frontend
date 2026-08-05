import { createClient } from '~/shared/api'

interface SigninOptions {
  email: string
}

export const signin = (options: SigninOptions) => {
  const client = createClient()

  return client('/auth/signin', { method: 'POST', body: options })
}
