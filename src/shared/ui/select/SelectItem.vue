<template>
  <SelectItem
    v-bind="forward"
    class="px-3 h-12 bg-white hover:bg-gray-100 active:bg-gray-200 flex items-center gap-2 rounded-2xl cursor-pointer data-[state=checked]:bg-blue-50"
  >
    <slot />
  </SelectItem>
</template>

<script setup lang="ts">
import {
  SelectItem,
  type SelectItemEmits,
  type SelectItemProps,
  useForwardPropsEmits,
} from 'reka-ui'

const props = defineProps<SelectItemProps>()
const emits = defineEmits<SelectItemEmits>()

const forward = useForwardPropsEmits(props, emits)
</script>
