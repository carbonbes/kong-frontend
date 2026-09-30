<template>
  <div class="mx-auto p-4 max-w-160">
    <EditorContent :content readonly />
  </div>
</template>

<script setup lang="ts">
import { EditorContent } from '~/features/editor'
import type { JSONContent } from '@tiptap/vue-3'

const { content } = defineProps<{ content: JSONContent }>()
</script>
