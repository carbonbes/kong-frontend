<template>
  <div id="__layout" class="flex gap-4">
    <aside class="hidden lg:block w-62.5"></aside>

    <main class="mx-auto w-160 h-full">
      <NuxtPage />
    </main>

    <aside class="hidden xl:block w-62.5"></aside>

    <BottomNavbar />

    <Toasts />
  </div>
</template>

<script setup lang="ts">
import { BottomNavbar } from '~/widgets/bottom-navbar'
import { Toasts } from '~/widgets/toasts'
</script>
