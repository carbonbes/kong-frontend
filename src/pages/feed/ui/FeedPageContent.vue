<template>
  <div class="mx-auto px-4 w-full max-w-160">
    <div
      v-if="articles.length"
      class="pb-[calc(var(--bottom-navbar-height)+(var(--bottom-navbar-spacing))*2)] flex flex-col gap-4"
    >
      <ArticleCard v-for="article in articles" :key="article.id" :article />
      <HorizontalLoader v-if="hasNextPage" ref="loader" class="mx-auto py-4" />
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
import { HorizontalLoader } from '~/shared/ui/horizontal-loader'
import { useFeedQuery } from '../model/use-feed.query.ts'
import { Button } from '~/shared/ui/button'
import { EditorPageLink } from '~/shared/ui/links'

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
