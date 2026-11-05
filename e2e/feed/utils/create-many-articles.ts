import type { PrismaClient } from '../../../generated/prisma/client'

export const createManyArticles = (prisma: PrismaClient, count = 10) =>
  prisma.article.createMany({
    data: Array.from({ length: count }).map((_, i) => ({
      authorId: 1,
      content: {
        type: 'doc',
        content: [
          { type: 'paragraph', content: [{ type: 'text', text: 'Test' }] },
        ],
      },
      createdAt: new Date(i * 60 * 1000),
    })),
  })
