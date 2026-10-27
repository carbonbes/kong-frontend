import { request } from '@playwright/test'

export const getOtpFromEmail = async () => {
  const mailpitUrl = process.env.MAILPIT_URL
  const apiRequestContext = await request.newContext()

  const latestMessage = await (
    await apiRequestContext.get(`${mailpitUrl}/api/v1/message/latest`)
  ).json()

  const emailText = latestMessage.Text

  const match = emailText.match(/\b[A-Z0-9]{6}\b/)

  if (!match) {
    throw new Error('OTP-код не найден')
  }

  return match[0]
}
