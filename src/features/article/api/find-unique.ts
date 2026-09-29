import { createClient } from '~/shared/api'
import type { Article } from '~/shared/model'

interface FindUniqueOptions {
  id: number
}

export const findUnique = ({ id }: FindUniqueOptions): Promise<Article> => {
  const client = createClient()

  return client(`/articles/${id}`, { method: 'GET' })
}
