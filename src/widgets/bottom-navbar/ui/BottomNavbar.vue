<template>
  <div class="fixed left-0 bottom-0 p-4 w-full">
    <div
      class="sm:mx-auto p-1 sm:max-w-100 flex justify-between gap-2 bg-white rounded-full inset-ring-1 inset-ring-gray-200/75 shadow-md"
    >
      <BottomNavbarItem>
        <Icon name="tabler:home" class="size-6" />
      </BottomNavbarItem>

      <BottomNavbarItem>
        <Icon name="tabler:search" class="size-6" />
      </BottomNavbarItem>

      <BottomNavbarItem>
        <Icon name="tabler:pencil" class="size-6" />
      </BottomNavbarItem>

      <BottomNavbarItem>
        <Icon name="tabler:bell" class="size-6" />
      </BottomNavbarItem>

      <BottomNavbarItem>Я</BottomNavbarItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import BottomNavbarItem from './BottomNavbarItem.vue'
</script>
