import { createClient } from '~/shared/api'
import type { Article } from '~/shared/model'

interface CreateOptions {
  content: Article['content']
}

export const create = ({ content }: CreateOptions): Promise<Article> => {
  const client = createClient()

  return client('/articles', { method: 'POST', body: { content } })
}
