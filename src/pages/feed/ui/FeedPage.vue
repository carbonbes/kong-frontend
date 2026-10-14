<template>
  <div class="flex flex-col gap-(--feed-page-spacing)">
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
