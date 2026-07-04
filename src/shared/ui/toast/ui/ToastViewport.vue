<template>
  <ToastViewport v-bind="props" class="p-4 fixed bottom-0 right-0 flex flex-col gap-2" />
</template>

<script setup lang="ts">
import { ToastViewport, type ToastViewportProps } from 'reka-ui'

const props = defineProps<ToastViewportProps>()
</script>
