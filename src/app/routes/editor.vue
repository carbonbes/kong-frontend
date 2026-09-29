<template>
  <EditorPage :content="data?.content" />
</template>

<script setup lang="ts">
import { EditorPage } from '~/pages/editor'
import { findUnique } from '~/features/article'

definePageMeta({
  name: 'EditorPage',
})

const route = useRoute()

const { data } = useQuery({
  key: ['article'],
  query: () => findUnique({ id: +route.query.id! }),
  enabled: () => !!route.query.id,
})
</script>
