import { defineMutation } from '@pinia/colada'
import { signup } from '~/shared/api'

export const useSignup = defineMutation({ mutation: signup })
