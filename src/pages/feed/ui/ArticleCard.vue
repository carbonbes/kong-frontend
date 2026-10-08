<template>
  <BaseFloating as-child class="p-6 flex flex-col gap-4 rounded-4xl">
    <NuxtLink :to="{ name: 'ArticlePage', params: { id: article.id } }">
      <ArticleHeader :article />
      <ArticleContent :content="article.content" />
    </NuxtLink>
  </BaseFloating>
</template>

<script setup lang="ts">
import { BaseFloating } from '~/shared/ui/base-floating'
import type { Article } from '~/shared/model'
import { ArticleContent, ArticleHeader } from '~/entities/article'

const { article } = defineProps<{ article: Article }>()
</script>
