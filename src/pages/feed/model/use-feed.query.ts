import { type OrderBy, useAuthQuery } from '~/shared/model'
import { promiseTimeout } from '@vueuse/core'
import { findMany } from '~/entities/article'

export const useFeedQuery = () => {
  const route = useRoute()
  const { data: me } = useAuthQuery()
  const order = computed<OrderBy>(() =>
    !route.params.order || route.params.order === 'fresh' ? 'desc' : 'asc',
  )

  const { data, ...etc } = useInfiniteQuery({
    key: () => ['feed', route.params.order ?? 'desc'],
    initialPageParam: null as string | null,
    query: ({ pageParam }) =>
      findMany({
        after: pageParam ?? undefined,
        authorId: me.value!.id,
        orderBy: order.value,
        sortBy: 'createdAt',
      }),
    getNextPageParam: ({ meta: { after } }) => after,
  })

  const articles = computed(() =>
    (data.value?.pages ?? []).flatMap((page) => page.items),
  )

  return { ...etc, data, articles }
}
