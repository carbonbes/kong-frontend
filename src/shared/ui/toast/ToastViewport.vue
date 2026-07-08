<template>
  <ToastViewport
    v-bind="props"
    class="p-6 fixed bottom-0 right-1/2 translate-x-1/2 flex flex-col gap-2"
  />
</template>

<script setup lang="ts">
import { ToastViewport, type ToastViewportProps } from 'reka-ui'

const props = defineProps<ToastViewportProps>()
</script>
