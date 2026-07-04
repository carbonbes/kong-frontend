import { client } from '../'

interface SigninOptions {
  email: string
}

export function signin(options: SigninOptions) {
  return client('/auth/signin', { method: 'POST', body: options })
}
