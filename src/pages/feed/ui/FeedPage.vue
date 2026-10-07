<template>
  <div class="mx-auto p-4 pb-30 max-w-160 flex flex-col gap-14 overflow-y-auto">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold">Ваши статьи</h2>

      <SelectRoot v-model="order">
        <SelectTrigger
          v-if="articles.length"
          class="flex items-center gap-2 cursor-pointer"
        >
          <SelectValue />
          <SelectIcon />
        </SelectTrigger>

        <SelectPortal>
          <SelectContent>
            <SelectViewport>
              <SelectItem value="desc">
                <SelectItemText>Новые</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>

              <SelectItem value="asc">
                <SelectItemText>Старые</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
            </SelectViewport>
          </SelectContent>
        </SelectPortal>
      </SelectRoot>
    </div>

    <div v-if="articles.length" class="h-full flex flex-col gap-4">
      <ArticleCard v-for="article in articles" :key="article.id" :article />
      <HorizontalLoader v-if="hasNextPage" ref="loader" class="mx-auto p-4" />
    </div>

    <div v-else class="mx-auto">
      <p class="text-gray-500">У вас нет записей</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { OrderBy } from '~/shared/model'
import ArticleCard from './ArticleCard.vue'
import {
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from '~/shared/ui/select'
import { findMany } from '~/features/article'
import { HorizontalLoader } from '~/shared/ui/horizontal-loader'

const router = useRouter()
const route = useRoute()

const order = ref<OrderBy>(
  !route.params.order || route.params.order === 'fresh' ? 'desc' : 'asc',
)

watch(order, (value) =>
  router.push({
    name: route.name,
    params: { order: value === 'desc' ? 'fresh' : 'old' },
  }),
)

const { data: me } = useAuth()

const { data, hasNextPage, loadNextPage } = useInfiniteQuery({
  key: () => ['feed', order.value],
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

const loaderRef = useTemplateRef('loader')

const { stop } = useIntersectionObserver(
  loaderRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting && hasNextPage.value) {
      loadNextPage()
    }

    if (!hasNextPage.value) {
      stop()
    }
  },
  { threshold: 1 },
)
</script>
