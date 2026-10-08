import { createClient } from '~/shared/api'
import type { Article, OrderBy } from '~/shared/model'

interface FindManyOptions {
  after?: string | null
  authorId?: number
  before?: string | null
  limit?: number
  orderBy?: OrderBy
  sortBy?: Extract<keyof Article, 'createdAt' | 'rating'>
  subsiteId?: number
}

interface FindManyReturn {
  items: Article[]
  meta: { after: string | null; before: string | null; total: number }[]
}

export const findMany = ({
  after,
  authorId,
  before,
  limit,
  orderBy,
  sortBy,
  subsiteId,
}: FindManyOptions): Promise<FindManyReturn> => {
  const client = createClient()

  return client('/articles', {
    method: 'GET',
    query: { after, authorId, before, limit, orderBy, sortBy, subsiteId },
  })
}
