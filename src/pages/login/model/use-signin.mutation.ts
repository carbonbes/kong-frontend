import { defineMutation } from '@pinia/colada'
import { signin } from '../api'

export const useSignin = defineMutation({ mutation: signin })
