import { defineMutation } from '@pinia/colada'
import { signup } from '../api'

export const useSignup = defineMutation({ mutation: signup })
