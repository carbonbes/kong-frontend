<template>
  <DropdownMenuItem
    v-bind="forward"
    class="px-3 w-full h-12 flex items-center rounded-2xl cursor-pointer hover:bg-gray-100 active:bg-gray-200 data-[state=open]:bg-gray-100"
  >
    <slot />
  </DropdownMenuItem>
</template>

<script setup lang="ts">
import {
  DropdownMenuItem,
  type DropdownMenuItemEmits,
  type DropdownMenuItemProps,
  useForwardPropsEmits,
} from 'reka-ui'

const props = defineProps<DropdownMenuItemProps>()
const emits = defineEmits<DropdownMenuItemEmits>()

const forward = useForwardPropsEmits(props, emits)
</script>
