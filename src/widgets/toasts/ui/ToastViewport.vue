<template>
  <ToastViewport
    v-bind="props"
    class="fixed inset-0 sm:inset-auto sm:top-0 sm:right-0 p-4 w-full sm:max-w-100 flex flex-col gap-3 pointer-events-none"
  />
</template>

<script setup lang="ts">
import { ToastViewport, type ToastViewportProps } from 'reka-ui'

const props = defineProps<ToastViewportProps>()
</script>
