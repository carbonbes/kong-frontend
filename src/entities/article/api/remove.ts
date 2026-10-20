import type { Article } from '~/shared/model'

interface RemoveOptions {
  id: number
}

export const remove = ({ id }: RemoveOptions): Promise<Article> => {
  const { $api } = useNuxtApp()

  return $api(`/articles/${id}`, {
    method: 'DELETE',
  })
}
