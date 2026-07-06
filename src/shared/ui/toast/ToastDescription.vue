<template>
  <ToastDescription v-bind="props" class="text-gray-700">
    <slot />
  </ToastDescription>
</template>

<script setup lang="ts">
import { ToastDescription, type ToastDescriptionProps } from 'reka-ui'

const props = defineProps<ToastDescriptionProps>()
</script>
