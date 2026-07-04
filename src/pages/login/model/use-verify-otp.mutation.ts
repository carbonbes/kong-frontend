import { defineMutation } from '@pinia/colada'
import { verifyOtp } from '~/shared/api'

export const useVerifyOtp = defineMutation({ mutation: verifyOtp })
