<template>
  <ToastRoot
    v-bind="forward"
    class="p-4 w-full sm:w-87.5 bg-white flex flex-col gap-4 inset-ring-1 inset-ring-gray-200/75 rounded-3xl shadow-md pointer-events-auto"
  >
    <slot />
  </ToastRoot>
</template>

<script setup lang="ts">
import { ToastRoot, type ToastRootEmits, useForwardPropsEmits } from 'reka-ui'
import type { ToastRootProps } from './toast-root.props.interface'

const { variant, ...toastRootProps } = defineProps<ToastRootProps>()
const emits = defineEmits<ToastRootEmits>()

const forward = useForwardPropsEmits(toastRootProps, emits)
</script>
