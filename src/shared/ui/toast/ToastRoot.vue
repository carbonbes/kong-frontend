<template>
  <ToastRoot
    v-bind="forward"
    class="p-4 w-62.5 flex flex-col gap-4 bg-white inset-ring-1 inset-ring-gray-200 shadow-md rounded-3xl"
  >
    <slot />
  </ToastRoot>
</template>

<script setup lang="ts">
import {
  ToastRoot,
  type ToastRootEmits,
  type ToastRootProps,
  useForwardPropsEmits,
} from 'reka-ui'

const props = defineProps<ToastRootProps>()
const emits = defineEmits<ToastRootEmits>()

const forward = useForwardPropsEmits(props, emits)
</script>
