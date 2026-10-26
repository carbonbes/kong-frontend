import type { FindManyArticlesOptions } from '~/shared/model/find-many-articles-options.type.ts'
import type { FindManyArticlesReturn } from '~/shared/model/find-many-articles-return.type.ts'

export const findManyArticles = ({
  after,
  authorId,
  before,
  limit,
  orderBy,
  sortBy,
  subsiteId,
}: FindManyArticlesOptions): Promise<FindManyArticlesReturn> => {
  const { $api } = useNuxtApp()

  return $api('/articles', {
    method: 'GET',
    query: { after, authorId, before, limit, orderBy, sortBy, subsiteId },
  })
}
