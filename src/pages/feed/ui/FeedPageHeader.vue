<template>
  <div
    class="sticky top-0 h-(--feed-page-header-height) flex items-center bg-white"
  >
    <div
      class="mx-auto px-4 w-full max-w-160 flex items-center justify-between"
    >
      <h2 class="text-2xl font-bold" data-testid="feed-page/title">
        Ваши записи
      </h2>

      <SelectRoot v-model="order">
        <SelectTrigger v-if="articles.length" as-child>
          <BaseFloating
            class="px-4 py-2 flex items-center gap-2 bg-white rounded-full cursor-pointer"
            data-testid="feed-page/select/trigger"
          >
            <SelectValue />
            <SelectIcon />
          </BaseFloating>
        </SelectTrigger>

        <SelectPortal>
          <SelectContent data-testid="feed-page/select">
            <SelectViewport>
              <SelectItem
                value="desc"
                data-testid="feed-page/select/fresh-feed-button"
              >
                <SelectItemText>Новые</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>

              <SelectItem
                value="asc"
                data-testid="feed-page/select/old-feed-button"
              >
                <SelectItemText>Старые</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
            </SelectViewport>
          </SelectContent>
        </SelectPortal>
      </SelectRoot>
    </div>
  </div>
</template>

<script setup lang="ts">
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
import { BaseFloating } from '~/shared/ui/base-floating'
import type { OrderBy } from '~/shared/model'
import { useFeedInfiniteQuery } from '../model/use-feed.infinite-query.ts'

const route = useRoute()

const order = ref<OrderBy>(route.params.order === 'fresh' ? 'desc' : 'asc')

const router = useRouter()

watch(order, (value) =>
  router.push({
    name: route.name,
    params: { order: value === 'desc' ? 'fresh' : 'old' },
  }),
)

const { articles } = useFeedInfiniteQuery()
</script>
