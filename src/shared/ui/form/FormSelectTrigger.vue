<template>
  <button
    class="px-5 flex items-center justify-between bg-gray-100 rounded-3xl inset-ring-2 inset-ring-gray-200 hover:inset-ring-blue-700 cursor-pointer disabled:pointer-events-none disabled:opacity-50 data-[state=open]:inset-ring-blue-700 data-[error=true]:bg-red-50 data-[error=true]:inset-ring-red-600"
    :class="[sizes, bg]"
    :disabled
    :data-error="error"
    type="button"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { injectSelectRootContext } from 'reka-ui'
import { computed } from 'vue'
import type { FormSelectTriggerProps } from './form-select-trigger.props.interface'

const sizesObj = { sm: 'h-10', md: 'h-12', lg: 'h-14' }

const { disabled, error, size = 'md' } = defineProps<FormSelectTriggerProps>()

const { modelValue } = injectSelectRootContext()

const sizes = computed(() => sizesObj[size])
const bg = computed(() => ({ 'bg-white': modelValue.value }))
</script>
