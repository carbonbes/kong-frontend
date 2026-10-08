import { createClient } from '~/shared/api'
import type { Article } from '~/shared/model'

interface RemoveOptions {
  id: number
}

export const remove = ({ id }: RemoveOptions): Promise<Article> => {
  const client = createClient()

  return client(`/articles/${id}`, {
    method: 'DELETE',
  })
}
