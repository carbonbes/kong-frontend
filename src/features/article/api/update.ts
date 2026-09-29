import { createClient } from '~/shared/api'
import type { Article } from '~/shared/model'

interface UpdateOptions {
  id: number
  content: Article['content']
}

export const update = ({ id, content }: UpdateOptions) => {
  const client = createClient()

  return client(`/articles/${id}`, {
    method: 'PATCH',
    body: content,
  })
}
