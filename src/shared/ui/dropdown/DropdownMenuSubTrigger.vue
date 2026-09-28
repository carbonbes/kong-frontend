<template>
  <DropdownMenuSubTrigger v-bind="props">
    <DropdownMenuItemBase>
      <slot />

      <div class="ml-auto pl-6 flex items-center">
        <Icon name="tabler:chevron-right" />
      </div>
    </DropdownMenuItemBase>
  </DropdownMenuSubTrigger>
</template>

<script setup lang="ts">
import {
  DropdownMenuSubTrigger,
  type DropdownMenuSubTriggerProps,
} from 'reka-ui'
import DropdownMenuItemBase from './DropdownMenuItemBase.vue'

const props = withDefaults(defineProps<DropdownMenuSubTriggerProps>(), {
  asChild: true,
})
</script>
