import type { Article } from './article'

export interface FindManyArticlesReturn {
  items: Article[]
  meta: { after: string | null; before: string | null; total: number }
}
