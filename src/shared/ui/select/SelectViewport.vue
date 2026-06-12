<template>
  <SelectViewport v-bind="props" class="flex flex-col gap-1">
    <slot />
  </SelectViewport>
</template>

<script setup lang="ts">
import { SelectViewport, type SelectViewportProps } from 'reka-ui'

const props = defineProps<SelectViewportProps>()
</script>
