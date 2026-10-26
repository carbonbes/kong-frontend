<template>
  <div class="mx-auto px-4 w-full max-w-160">
    <div
      v-if="articles.length"
      class="pb-[calc(var(--bottom-navbar-height)+(var(--bottom-navbar-spacing))*2)] flex flex-col gap-4"
    >
      <ArticleCard v-for="article in articles" :key="article.id" :article />

      <div v-if="hasNextPage" class="mx-auto py-4">
        <HorizontalDotsLoader ref="loader" class="size-6 text-gray-500" />
      </div>

      <div v-else class="mx-auto py-4 text-gray-400">Больше нет записей</div>
    </div>

    <div
      v-else
      class="h-[calc(100vh-var(--feed-page-header-height)-var(--feed-page-spacing))] flex flex-col items-center justify-center gap-10"
    >
      <div class="flex flex-col items-center gap-2">
        <Icon name="tabler:news-off" class="size-14 text-gray-400" />
        <p>У вас нет записей</p>
      </div>

      <Button as-child>
        <EditorPageLink>Создать</EditorPageLink>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArticleCard from './ArticleCard.vue'
import { HorizontalDotsLoader } from '~/shared/ui/horizontal-dots-loader'
import { useFeedInfiniteQuery } from '../model/use-feed.infinite-query.ts'
import { Button } from '~/shared/ui/button'
import { EditorPageLink } from '~/shared/ui/links'

const { articles, hasNextPage, loadNextPage } = useFeedInfiniteQuery()

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
