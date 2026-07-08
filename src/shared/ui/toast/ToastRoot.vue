<template>
  <ToastRoot
    v-bind="forward"
    class="p-4 w-62.5 flex flex-col gap-4 inset-ring-2 rounded-3xl"
    :class="classes"
  >
    <slot />
  </ToastRoot>
</template>

<script setup lang="ts">
import { ToastRoot, type ToastRootEmits, useForwardPropsEmits } from 'reka-ui'
import type { ToastRootProps } from './toast-root.props.interface'
import { computed } from 'vue'

const { variant, ...toastRootProps } = defineProps<ToastRootProps>()
const emits = defineEmits<ToastRootEmits>()

const forward = useForwardPropsEmits(toastRootProps, emits)

const classes = computed(() =>
  variant === 'success'
    ? 'bg-green-50 inset-ring-green-600'
    : 'bg-red-50 inset-ring-red-600',
)
</script>
