import { client } from '~/shared/api'
import type { EncodedJwt, OtpType } from '~/shared/model'

interface VerifyOtpOptions {
  code: string
  type: OtpType
  email: string
}

interface VerifyOtpReturn {
  accessToken: EncodedJwt
  refreshToken: EncodedJwt
}

export const verifyOtp = (
  options: VerifyOtpOptions,
): Promise<VerifyOtpReturn> => {
  return client('/auth/verify-otp', { method: 'POST', body: options })
}
