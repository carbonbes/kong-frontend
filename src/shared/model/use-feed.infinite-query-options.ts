import { defineInfiniteQueryOptions } from '@pinia/colada'
import { findManyArticles } from '~/shared/api'

export const useFeedInfiniteQueryOptions = defineInfiniteQueryOptions(
  ({
    order,
    authorId,
  }: {
    order: 'fresh' | 'old' | undefined
    authorId: number
  }) => {
    const orderBy = !order || order === 'fresh' ? 'desc' : 'asc'

    return {
      key: ['feed', orderBy],
      initialPageParam: null as string | null,
      query: ({ pageParam }) =>
        findManyArticles({
          after: pageParam ?? undefined,
          authorId,
          orderBy,
          sortBy: 'createdAt',
        }),
      getNextPageParam: ({ meta: { after } }) => after,
    }
  },
)
