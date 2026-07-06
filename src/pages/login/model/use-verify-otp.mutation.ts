import { defineMutation } from '@pinia/colada'
import { verifyOtp } from '../api'

export const useVerifyOtp = defineMutation({ mutation: verifyOtp })
