<template>
  <div id="__layout">
    <NuxtLoadingIndicator />

    <NuxtPage />

    <Toasts />
  </div>
</template>

<script setup lang="ts">
import { Toasts } from '~/widgets/toasts'
</script>
