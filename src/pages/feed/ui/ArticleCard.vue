<template>
  <BaseFloating as-child>
    <NuxtLink
      :to="{ name: 'ArticlePage', params: { id: article.id } }"
      class="p-6 flex flex-col gap-4 rounded-4xl"
    >
      <ArticleHeader :article />
      <EditorContent :content="article.content" readonly />
    </NuxtLink>
  </BaseFloating>
</template>

<script setup lang="ts">
import { BaseFloating } from '~/shared/ui/base-floating'
import type { Article } from '~/shared/model'
import { ArticleHeader } from '~/entities/article'
import { EditorContent } from '~/widgets/editor'

const { article } = defineProps<{ article: Article }>()
</script>
