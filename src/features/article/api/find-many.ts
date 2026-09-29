import { createClient } from '~/shared/api'
import type { Article, OrderBy } from '~/shared/model'

interface FindManyOptions {
  after?: string
  authorId?: number
  before?: string
  limit?: number
  orderBy?: OrderBy
  sortBy?: Extract<keyof Article, 'createdAt' | 'rating'>
  subsiteId?: number
}

export const findMany = ({
  after,
  authorId,
  before,
  limit,
  orderBy,
  sortBy,
  subsiteId,
}: FindManyOptions): Promise<Article[]> => {
  const client = createClient()

  return client('/articles', {
    method: 'GET',
    query: { after, authorId, before, limit, orderBy, sortBy, subsiteId },
  })
}
