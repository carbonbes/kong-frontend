<template>
  <div class="flex flex-col gap-(--feed-page-spacing)">
    <FeedPageHeader />
    <FeedPageContent />
  </div>
</template>

<script setup lang="ts">
import { useFeedInfiniteQuery } from '../model/use-feed.infinite-query.ts'
import FeedPageHeader from './FeedPageHeader.vue'
import FeedPageContent from './FeedPageContent.vue'

const { refresh } = useFeedInfiniteQuery()
await refresh()
</script>
