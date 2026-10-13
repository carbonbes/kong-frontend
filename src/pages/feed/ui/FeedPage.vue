<template>
  <div class="pb-30 flex flex-col gap-8">
    <FeedPageHeader />
    <FeedPageContent />
  </div>
</template>

<script setup lang="ts">
import { useFeedQuery } from '../model/use-feed.query.ts'
import FeedPageHeader from './FeedPageHeader.vue'
import FeedPageContent from './FeedPageContent.vue'

const { refresh } = useFeedQuery()
await refresh()
</script>
