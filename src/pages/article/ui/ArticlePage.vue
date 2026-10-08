<template>
  <div class="mx-auto p-4 max-w-160 flex flex-col gap-4">
    <ArticleHeader v-if="article" :article />
    <ArticleContent v-if="article" :content="article.content" />
  </div>
</template>

<script setup lang="ts">
import { ArticleContent, ArticleHeader, findUnique } from '~/entities/article'

const route = useRoute()

const { data: article } = useQuery({
  key: () => ['article', route.params.id!],
  query: () => findUnique({ id: +route.params.id! }),
})
</script>
