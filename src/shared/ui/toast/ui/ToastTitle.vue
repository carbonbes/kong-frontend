<template>
  <ToastTitle v-bind="props" class="text-gray-700 font-medium">
    <slot />
  </ToastTitle>
</template>

<script setup lang="ts">
import { ToastTitle, type ToastTitleProps } from 'reka-ui'

const props = defineProps<ToastTitleProps>()
</script>
