<template>
  <Primitive
    v-bind="props"
    class="inset-ring-1 inset-ring-gray-200/75 shadow-md"
  >
    <slot />
  </Primitive>
</template>

<script setup lang="ts">
import { Primitive, type PrimitiveProps } from 'reka-ui'

const props = defineProps<PrimitiveProps>()
</script>
