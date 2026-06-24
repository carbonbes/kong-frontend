<template>
  <SelectItem
    v-bind="forward"
    class="p-2 bg-white hover:bg-gray-100 active:bg-gray-200 flex items-center justify-between rounded-xl cursor-pointer data-[state=checked]:bg-blue-50 data-[state=checked]:pointer-events-none"
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
