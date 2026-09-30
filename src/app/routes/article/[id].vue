<template>
  <ArticlePage :content="article?.content!" />
</template>

<script setup lang="ts">
import { ArticlePage } from '~/pages/article'
import { findUnique } from '~/features/article'

definePageMeta({
  name: 'ArticlePage',
})

const route = useRoute()

const { data: article } = useQuery({
  key: ['article'],
  query: () => findUnique({ id: +route.params.id! }),
})
</script>
