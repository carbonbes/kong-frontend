import { request } from '@playwright/test'

export const clearMailpitMessages = async () => {
  const mailpitUrl = process.env.MAILPIT_URL

  const apiRequestContext = await request.newContext()

  await apiRequestContext.delete(`${mailpitUrl}/api/v1/messages`, {
    data: { type: 'all' },
  })
}
