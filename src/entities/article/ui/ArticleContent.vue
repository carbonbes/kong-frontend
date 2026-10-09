<template>
  <EditorContent :content readonly />
</template>

<script setup lang="ts">
import { EditorContent } from '~/entities/editor'
import type { Content } from '@tiptap/vue-3'

const { content } = defineProps<{ content: Content }>()
</script>
