<template>
  <EditorPage :content="article?.content" @update="handleUpdate" />
</template>

<script setup lang="ts">
import { EditorPage } from '~/pages/editor'
import { create, findUnique, update } from '~/features/article'
import type { JSONContent } from '@tiptap/vue-3'

definePageMeta({
  name: 'EditorPage',
})

const route = useRoute()

const { data: article } = useQuery({
  key: ['editor-article'],
  query: () => findUnique({ id: +route.query.id! }),
  enabled: () => !!route.query.id,
})

const { mutate } = useMutation({
  mutation: (content: JSONContent) =>
    !article.value
      ? create({ content })
      : update({ id: article.value.id, content }),
})

const handleUpdate = (data: JSONContent) => {
  mutate(data)
}
</script>
