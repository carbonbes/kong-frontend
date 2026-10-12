<template>
  <div class="mx-auto p-4 pb-30 max-w-160 flex flex-col gap-14">
    <FeedPageHeader />
    <FeedPageContent />
  </div>
</template>

<script setup lang="ts">
import type { OrderBy } from '~/shared/model'
import { useFeedQuery } from '../model/use-feed.query.ts'
import FeedPageHeader from './FeedPageHeader.vue'
import FeedPageContent from './FeedPageContent.vue'

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

const { refresh } = useFeedQuery()
await refresh()
</script>
