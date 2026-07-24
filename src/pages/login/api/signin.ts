import { client } from '~/shared/api'

interface SigninOptions {
  email: string
}

export const signin = (options: SigninOptions) => {
  return client('/auth/signin', { method: 'POST', body: options })
}
