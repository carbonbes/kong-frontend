<template>
  <button
    class="flex items-center justify-between bg-gray-100 ring-2 ring-gray-200 hover:ring-blue-700 cursor-pointer disabled:pointer-events-none disabled:opacity-50 data-[state=open]:ring-blue-700 data-[error=true]:bg-red-50 data-[error=true]:ring-red-600 data-[success=true]:bg-green-50 data-[success=true]:ring-green-600"
    :class="[rounding, sizes, bg]"
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

const {
  disabled,
  rounded = 'medium',
  size = 'medium',
} = defineProps<FormSelectTriggerProps>()

const { modelValue } = injectSelectRootContext()

const rounding = computed(() =>
  rounded === 'small'
    ? 'px-2.5 rounded-lg'
    : rounded === 'medium'
      ? 'px-4 rounded-2xl'
      : 'px-6 rounded-3xl',
)

const sizes = computed(() =>
  size === 'small' ? 'py-2.5' : size === 'medium' ? 'py-3' : 'py-4',
)

const bg = computed(() => ({ 'bg-white': modelValue.value }))

const { error, valid } = useFormField()
</script>
