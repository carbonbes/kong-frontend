import type { Article } from '~/shared/model'

interface CreateOptions {
  content: Article['content']
}

export const create = ({ content }: CreateOptions): Promise<Article> => {
  const { $api } = useNuxtApp()

  return $api('/articles', { method: 'POST', body: { content } })
}
