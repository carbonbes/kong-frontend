<template>
  <DropdownMenuItemBase v-bind="forward">
    <slot />
  </DropdownMenuItemBase>
</template>

<script setup lang="ts">
import DropdownMenuItemBase from './DropdownMenuItemBase.vue'
import {
  type DropdownMenuItemEmits,
  type DropdownMenuItemProps,
  useForwardPropsEmits,
} from 'reka-ui'

const props = defineProps<DropdownMenuItemProps>()
const emits = defineEmits<DropdownMenuItemEmits>()

const forward = useForwardPropsEmits(props, emits)
</script>
