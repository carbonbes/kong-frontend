<template>
  <ToastClose v-bind="props" class="cursor-pointer hover:opacity-50">
    <Icon name="tabler:x" class="size-5" />
  </ToastClose>
</template>

<script setup lang="ts">
import { ToastClose, type ToastCloseProps } from 'reka-ui'

const props = defineProps<ToastCloseProps>()
</script>
