<template>
  <button
    class="px-5 flex items-center justify-between bg-gray-100 rounded-3xl inset-ring-2 inset-ring-gray-200 hover:inset-ring-blue-700 cursor-pointer disabled:pointer-events-none disabled:opacity-50 data-[state=open]:inset-ring-blue-700 data-[error=true]:bg-red-50 data-[error=true]:inset-ring-red-600 data-[success=true]:bg-green-50 data-[success=true]:inset-ring-green-600"
    :class="[sizes, bg]"
    :disabled
    :data-error="!!error"
    :data-success="valid"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { injectSelectRootContext } from 'reka-ui'
import { computed } from 'vue'
import { useFormField } from './useFormField'
import type { FormSelectTriggerProps } from './form-select-trigger.props.interface'

const { disabled, size = 'medium' } = defineProps<FormSelectTriggerProps>()

const { modelValue } = injectSelectRootContext()

const sizes = computed(() =>
  size === 'small' ? 'h-10' : size === 'medium' ? 'h-12' : 'h-14',
)

const bg = computed(() => ({ 'bg-white': modelValue.value }))

const { error, valid } = useFormField()
</script>
