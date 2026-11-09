import {
  setInfiniteQueryData,
  useQueryCache,
  type UseInfiniteQueryData,
} from '@pinia/colada'
import { remove } from '../api/remove'
import type { FindManyArticlesReturn } from '~/shared/model'
import {
  useAuthQuery,
  useFeedInfiniteQueryOptions,
  useToasts,
} from '~/shared/model'

interface RemoveArticleMutationOptions {
  redirectToFeed?: boolean
}

interface RemoveArticleMutationContext {
  snapshots: Array<{
    order: 'fresh' | 'old'
    key: ReturnType<typeof useFeedInfiniteQueryOptions>['key']
    previousFeed: UseInfiniteQueryData<FindManyArticlesReturn, string | null>
  }>
}

const FEEDS_ORDERS = ['fresh', 'old'] as const

export const useRemoveArticleMutation = ({
  redirectToFeed = false,
}: RemoveArticleMutationOptions = {}) => {
  const queryCache = useQueryCache()

  const { errorToastify, successToastify } = useToasts()
  const { data: me } = useAuthQuery()

  const feeds = FEEDS_ORDERS.map((order) => ({
    order,
    options: useFeedInfiniteQueryOptions({ order, authorId: me.value!.id }),
  }))

  return useMutation({
    mutation: (id: number) => remove({ id }),

    onMutate: async (id) => {
      const snapshots = feeds.flatMap(({ order, options: { key } }) => {
        queryCache.cancelQueries({ key })

        const previousFeed = queryCache.getQueryData(key)
        if (!previousFeed) {
          return []
        }

        const newFeedPages = previousFeed.pages.map((page) => ({
          ...page,
          items: page.items.filter((feedArticle) => feedArticle.id !== id),
        })) as Array<FindManyArticlesReturn>

        const newFeed: UseInfiniteQueryData<
          FindManyArticlesReturn,
          string | null
        > = {
          ...previousFeed,
          pages: newFeedPages,
        }

        setInfiniteQueryData(queryCache, key, newFeed)

        return [{ order, key, previousFeed }]
      })

      successToastify({ title: 'Готово', description: 'Запись удалена' })

      if (redirectToFeed) {
        const cachedOrder = snapshots.find(({ previousFeed }) =>
          previousFeed.pages.some(({ items }) => items.length),
        )?.order

        await navigateTo({
          name: 'FeedPage',
          params: { order: cachedOrder ?? 'fresh' },
          replace: true,
        })
      }

      return { snapshots } satisfies RemoveArticleMutationContext
    },

    onSettled: () => {
      queryCache.invalidateQueries({ key: ['feed'] })
    },

    onError: (_, __, { snapshots }) => {
      for (const { key, previousFeed } of snapshots) {
        setInfiniteQueryData(queryCache, key, previousFeed)
      }

      errorToastify({
        title: 'Ошибка',
        description: 'Не удалось удалить запись',
      })
    },
  })
}
