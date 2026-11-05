import type { PrismaClient } from '../../../generated/prisma/client'

export const truncateArticles = (prisma: PrismaClient) =>
  prisma.$queryRaw`TRUNCATE TABLE articles RESTART IDENTITY CASCADE`
