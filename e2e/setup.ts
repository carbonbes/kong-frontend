import { test } from '@playwright/test'
import { PrismaClient } from '../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { clearMailpitMessages, getOtpFromEmail } from '../src/shared/tests'

test('Authentication', async ({ page }) => {
  const apiUrl = process.env.NUXT_PUBLIC_API_BASE_URL
  const signinUrl = `${apiUrl}/auth/signin`
  const verifyOtpUrl = `${apiUrl}/auth/verify-otp`

  const prisma = new PrismaClient({
    adapter: new PrismaPg(
      new Pool({ connectionString: process.env.DATABASE_URL }),
    ),
  })

  await prisma.$queryRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`

  await prisma.user.create({
    data: {
      email: 'test@email.com',
      name: 'Test',
      gender: 'male',
      isActive: true,
    },
  })

  await clearMailpitMessages()

  await page.request.post(signinUrl, {
    data: {
      email: 'test@email.com',
    },
  })

  await page.waitForTimeout(1000)

  const otp = await getOtpFromEmail()

  await page.request.post(verifyOtpUrl, {
    data: { code: otp, type: 'SIGN_IN', email: 'test@email.com' },
  })

  await page.request.storageState({ path: 'e2e/.auth/cookies.json' })
})
