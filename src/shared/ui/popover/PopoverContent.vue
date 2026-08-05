<template>
  <PopoverContent
    v-bind="forward"
    class="p-2 bg-white rounded-3xl inset-ring-1 inset-ring-gray-200/75 shadow-md"
  >
    <slot />
  </PopoverContent>
</template>

<script setup lang="ts">
import {
  PopoverContent,
  type PopoverContentEmits,
  type PopoverContentProps,
  useForwardPropsEmits,
} from 'reka-ui'

const props = defineProps<PopoverContentProps>()
const emits = defineEmits<PopoverContentEmits>()

const forward = useForwardPropsEmits(props, emits)
</script>
