<template>
  <ToastClose v-bind="props">
    <Icon name="tabler:x" class="size-5" />
  </ToastClose>
</template>

<script setup lang="ts">
import { ToastClose, type ToastCloseProps } from 'reka-ui'

const props = defineProps<ToastCloseProps>()
</script>
