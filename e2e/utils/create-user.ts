import type { PrismaClient } from '../../generated/prisma/client'

export const createUser = (prisma: PrismaClient, isActive = true) =>
  prisma.user.create({
    data: {
      email: 'test@email.com',
      name: 'Test',
      gender: 'male',
      isActive,
    },
  })
