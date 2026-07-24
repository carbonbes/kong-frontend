<template>
  <div id="__layout" class="flex gap-4">
    <aside class="hidden lg:block flex-1"></aside>

    <main class="mx-auto w-160 h-full">
      <NuxtPage />
    </main>

    <aside class="hidden xl:block flex-1"></aside>

    <Toasts />
  </div>
</template>

<script setup lang="ts">
import { Toasts } from '~/widgets/toasts'
</script>
