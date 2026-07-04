import { defineMutation } from '@pinia/colada'
import { signin } from '~/shared/api'

export const useSignin = defineMutation({ mutation: signin })
