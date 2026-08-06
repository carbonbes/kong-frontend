<template>
  <ToastViewport
    v-bind="props"
    class="fixed inset-0 sm:inset-[0_0_auto_auto] p-4 flex flex-col gap-3 pointer-events-none"
  />
</template>

<script setup lang="ts">
import { ToastViewport, type ToastViewportProps } from 'reka-ui'

const props = defineProps<ToastViewportProps>()
</script>
