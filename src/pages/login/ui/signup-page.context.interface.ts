import type { UserGender } from '~/shared/model'

export interface SignupPageContext {
  formValues: {
    email: string | undefined
    name: string | undefined
    gender: keyof typeof UserGender | undefined
  }
}
