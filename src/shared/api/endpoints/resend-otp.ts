import { createClient } from '../'
import type { OtpType } from '~/shared/model'

interface ResendOtpOptions {
  email: string
  type: OtpType
}

export const resendOtp = (options: ResendOtpOptions) => {
  const client = createClient()

  return client('/auth/resend-otp', { method: 'POST', body: options })
}
