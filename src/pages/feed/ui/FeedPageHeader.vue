<template>
  <div
    class="sticky top-0 h-(--feed-page-header-height) flex items-center bg-white"
  >
    <div
      class="mx-auto px-4 w-full max-w-160 flex items-center justify-between"
    >
      <h2 class="text-2xl font-bold">Ваши статьи</h2>

      <SelectRoot v-model="order">
        <SelectTrigger v-if="articles.length" as-child>
          <BaseFloating
            class="px-4 py-2 flex items-center gap-2 bg-white rounded-full cursor-pointer"
          >
            <SelectValue />
            <SelectIcon />
          </BaseFloating>
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
import { useFeedQuery } from '../model/use-feed.query.ts'

const route = useRoute()

const order = ref<OrderBy>(
  !route.params.order || route.params.order === 'fresh' ? 'desc' : 'asc',
)

const router = useRouter()

watch(order, (value) =>
  router.push({
    name: route.name,
    params: { order: value === 'desc' ? 'fresh' : 'old' },
  }),
)

const { articles } = useFeedQuery()
</script>
