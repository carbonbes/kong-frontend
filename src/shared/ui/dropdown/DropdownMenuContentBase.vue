<template>
  <BaseFloating class="p-2 flex flex-col gap-2 bg-white rounded-3xl">
    <slot />
  </BaseFloating>
</template>

<script setup lang="ts">
import { BaseFloating } from '~/shared/ui/base-floating'
</script>
