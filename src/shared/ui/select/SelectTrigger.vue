<template>
  <SelectTrigger
    v-bind="props"
    class="px-6 py-3 flex items-center justify-between rounded-3xl bg-gray-100 ring-2 ring-gray-200 hover:ring-blue-700 cursor-pointer disabled:pointer-events-none disabled:opacity-50 data-[state=open]:ring-blue-700"
    :class="classes"
  >
    <slot />
  </SelectTrigger>
</template>

<script setup lang="ts">
import {
  injectSelectRootContext,
  SelectTrigger,
  type SelectTriggerProps,
} from 'reka-ui'
import { computed } from 'vue'

const props = defineProps<SelectTriggerProps>()

const { modelValue } = injectSelectRootContext()

const classes = computed(() => ({ 'bg-white': modelValue.value }))
</script>
