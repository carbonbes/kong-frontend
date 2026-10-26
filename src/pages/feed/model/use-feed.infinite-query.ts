import { useAuthQuery, useFeedInfiniteQueryOptions } from '~/shared/model'

export const useFeedInfiniteQuery = () => {
  const route = useRoute()
  const { data: me } = useAuthQuery()

  const { data, ...etc } = useInfiniteQuery(
    useFeedInfiniteQueryOptions({
      order: route.params.order as 'fresh' | 'old' | undefined,
      authorId: me.value!.id,
    }),
  )

  const articles = computed(() =>
    (data.value?.pages ?? []).flatMap((page) => page.items),
  )

  return { ...etc, data, articles }
}
