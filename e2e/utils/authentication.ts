import type { PrismaClient } from '../../generated/prisma/client'
import type { Page } from 'playwright-core'
import { truncateUsers } from './truncate-users'
import { createUser } from './create-user'
import { clearMailpitMessages } from './clear-mailpit-messages'
import { getOtpFromEmail } from './get-otp-from-email'

const apiUrl = process.env.NUXT_PUBLIC_API_BASE_URL

export const authentication = async (
  prisma: PrismaClient,
  page: Page,
  email = 'test@email.com',
) => {
  await truncateUsers(prisma)
  await createUser(prisma)
  await clearMailpitMessages()

  await page.request.post(`${apiUrl}/auth/signin`, {
    data: {
      email,
    },
  })

  await page.waitForTimeout(1000)

  const otp = await getOtpFromEmail()

  await page.request.post(`${apiUrl}/auth/verify-otp`, {
    data: { code: otp, type: 'SIGN_IN', email },
  })
}
