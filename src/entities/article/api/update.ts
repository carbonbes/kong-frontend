import type { Article } from '~/shared/model'

interface UpdateOptions {
  id: number
  content: Article['content']
}

export const update = ({ id, content }: UpdateOptions): Promise<Article> => {
  const { $api } = useNuxtApp()

  return $api(`/articles/${id}`, {
    method: 'PATCH',
    body: { content },
  })
}
