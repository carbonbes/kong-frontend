<template>
  <SelectPortal v-bind="props">
    <slot />
  </SelectPortal>
</template>

<script setup lang="ts">
import { SelectPortal, type SelectPortalProps } from 'reka-ui'

const props = defineProps<SelectPortalProps>()
</script>
