<template>
  <DropdownMenuItem v-bind="forward">
    <DropdownMenuItemBase>
      <slot />
    </DropdownMenuItemBase>
  </DropdownMenuItem>
</template>

<script setup lang="ts">
import {
  DropdownMenuItem,
  type DropdownMenuItemEmits,
  type DropdownMenuItemProps,
  useForwardPropsEmits,
} from 'reka-ui'
import DropdownMenuItemBase from './DropdownMenuItemBase.vue'

const props = withDefaults(defineProps<DropdownMenuItemProps>(), {
  asChild: true,
})

const emits = defineEmits<DropdownMenuItemEmits>()

const forward = useForwardPropsEmits(props, emits)
</script>
