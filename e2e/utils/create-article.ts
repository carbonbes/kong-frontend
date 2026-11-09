import type { PrismaClient } from '../../generated/prisma/client'
import { createArticleContent } from './create-article-content'
import type { ArticleNodeInput } from '../types'

export const createArticle = (
  prisma: PrismaClient,
  nodes: ReadonlyArray<ArticleNodeInput> = [''],
  createdAt?: Date,
) =>
  prisma.article.create({
    data: {
      authorId: 1,
      content: createArticleContent(nodes),
      ...(createdAt && { createdAt }),
    },
  })
