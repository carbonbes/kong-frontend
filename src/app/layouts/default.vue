<template>
  <div id="__layout" class="flex gap-4">
    <main class="size-full">
      <NuxtPage />
    </main>

    <BottomNavbar />

    <Toasts />
  </div>
</template>

<script setup lang="ts">
import { BottomNavbar } from '~/widgets/bottom-navbar'
import { Toasts } from '~/widgets/toasts'
</script>
