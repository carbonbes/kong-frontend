<template>
  <SelectContent
    v-bind="forward"
    class="p-2 bg-white rounded-3xl inset-ring-1 inset-ring-gray-200/75 shadow-md"
  >
    <slot />
  </SelectContent>
</template>

<script setup lang="ts">
import {
  SelectContent,
  type SelectContentEmits,
  type SelectContentProps,
  useForwardPropsEmits,
} from 'reka-ui'

const props = withDefaults(defineProps<SelectContentProps>(), {
  align: 'center',
  position: 'popper',
  side: 'bottom',
  sideOffset: 2.5,
})

const emits = defineEmits<SelectContentEmits>()

const forward = useForwardPropsEmits(props, emits)
</script>
