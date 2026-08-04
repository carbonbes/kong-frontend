<template>
  <Primitive
    v-bind="props"
    class="p-3 flex justify-center flex-1 hover:bg-gray-100 rounded-3xl cursor-pointer [&.router-link-active]:bg-blue-50 [&.router-link-active]:text-blue-500"
  >
    <slot />
  </Primitive>
</template>

<script setup lang="ts">
import { Primitive, type PrimitiveProps } from 'reka-ui'

const props = withDefaults(defineProps<PrimitiveProps>(), { as: 'button' })
</script>
