import type { OrderBy } from './order-by'
import type { Article } from './article'

export interface FindManyArticlesOptions {
  after?: string | null
  authorId?: number
  before?: string | null
  limit?: number
  orderBy?: OrderBy
  sortBy?: Extract<keyof Article, 'createdAt' | 'rating'>
  subsiteId?: number
}
