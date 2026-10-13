<template>
  <div class="mx-auto px-4 w-full max-w-160">
    <div v-if="articles.length" class="h-full flex flex-col gap-4">
      <ArticleCard v-for="article in articles" :key="article.id" :article />
      <HorizontalLoader v-if="hasNextPage" ref="loader" class="mx-auto py-8" />
    </div>

    <div v-else class="mx-auto">
      <p class="text-gray-500">У вас нет записей</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArticleCard from './ArticleCard.vue'
import { HorizontalLoader } from '~/shared/ui/horizontal-loader'
import { useFeedQuery } from '../model/use-feed.query.ts'

const { articles, hasNextPage, loadNextPage } = useFeedQuery()

const loaderRef = useTemplateRef('loader')

const { stop } = useIntersectionObserver(
  loaderRef,
  ([entry]) => {
    if (!entry) {
      return
    }

    if (entry.isIntersecting && hasNextPage.value) {
      loadNextPage()
    }

    if (!hasNextPage.value) {
      stop()
    }
  },
  { threshold: 1 },
)
</script>
