<template>
  <div class="mx-auto p-4 max-w-160 flex flex-col gap-4">
    <ArticleHeader v-if="article" :article />
    <EditorContent v-if="article" :content="article.content" readonly />
  </div>
</template>

<script setup lang="ts">
import { ArticleHeader, findUnique } from '~/entities/article'
import { EditorContent } from '~/widgets/editor'

const route = useRoute()

const { data: article } = useQuery({
  key: () => ['article', route.params.id!],
  query: () => findUnique({ id: +route.params.id! }),
})
</script>
