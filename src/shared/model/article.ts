import type { ArticleStatus } from './article-status.ts'
import type { JSONContent } from '@tiptap/vue-3'

export interface Article {
  id: number
  authorId: number
  subsiteId: number | null
  status: ArticleStatus
  rating: number
  content: JSONContent
  createdAt: Date
  updatedAt: Date
}
