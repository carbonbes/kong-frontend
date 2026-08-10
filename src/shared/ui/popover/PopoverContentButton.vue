<template>
  <Primitive
    v-bind="props"
    class="px-5 py-2 hover:bg-gray-100 active:bg-gray-200 cursor-pointer rounded-2xl"
  >
    <slot />
  </Primitive>
</template>

<script setup lang="ts">
import { Primitive, type PrimitiveProps } from 'reka-ui'

const props = withDefaults(defineProps<PrimitiveProps>(), { as: 'button' })
</script>
