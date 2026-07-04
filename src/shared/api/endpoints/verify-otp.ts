import { client } from '../'
import type { OtpType, User } from '~/shared/model'

interface VerifyOtpOptions {
  code: string
  type: OtpType
  email: string
}

export function verifyOtp(options: VerifyOtpOptions): Promise<User> {
  return client('/auth/verify-otp', { method: 'POST', body: options })
}
