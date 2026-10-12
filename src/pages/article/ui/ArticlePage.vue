<template>
  <div class="mx-auto p-4 max-w-160 flex flex-col gap-4">
    <ArticleHeader v-if="article" :article />
    <EditorContent v-if="article" :content="article.content" readonly />
  </div>
</template>

<script setup lang="ts">
import { ArticleHeader, findUnique } from '~/entities/article'
import { EditorContent } from '~/widgets/editor'
import { promiseTimeout } from '@vueuse/core'

const route = useRoute()

const { data: article, refresh } = useQuery({
  key: () => ['article', route.params.id!],
  query: async () => {
    await promiseTimeout(1000)

    return findUnique({ id: +route.params.id! })
  },
})

await refresh()
</script>
