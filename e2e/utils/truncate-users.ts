import type { PrismaClient } from '../../generated/prisma/client'

export const truncateUsers = (prisma: PrismaClient) =>
  prisma.$queryRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`
