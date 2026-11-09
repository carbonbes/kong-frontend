<template>
  <div class="mx-auto p-4 max-w-160 flex flex-col gap-4">
    <ArticleHeader v-if="article" :article @remove-article="removeArticle" />
    <EditorContent v-if="article" :content="article.content" readonly />
  </div>
</template>

<script setup lang="ts">
import {
  ArticleHeader,
  findUnique,
  useRemoveArticleMutation,
} from '~/entities/article'
import { EditorContent } from '~/widgets/editor'

const route = useRoute()

const { data: article, refresh } = useQuery({
  key: () => ['article', route.params.id!],
  query: () => findUnique({ id: +route.params.id! }),
})

await refresh()

const { mutate: removeArticle } = useRemoveArticleMutation({
  redirectToFeed: true,
})
</script>
