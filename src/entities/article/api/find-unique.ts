import type { Article } from '~/shared/model'

interface FindUniqueOptions {
  id: number
}

export const findUnique = ({ id }: FindUniqueOptions): Promise<Article> => {
  const { $api } = useNuxtApp()

  return $api(`/articles/${id}`, { method: 'GET' })
}
