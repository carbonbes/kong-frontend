import { createClient } from '../'
import type { OtpType, VerifyOtpReturn } from '~/shared/model'

interface VerifyOtpOptions {
  code: string
  type: OtpType
  email: string
}

export const verifyOtp = (
  options: VerifyOtpOptions,
): Promise<VerifyOtpReturn> => {
  const client = createClient()

  return client('/auth/verify-otp', { method: 'POST', body: options })
}
