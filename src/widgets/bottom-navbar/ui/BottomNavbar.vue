<template>
  <div class="fixed left-0 bottom-0 p-4 w-full">
    <div
      class="p-1 sm:hidden flex justify-between bg-white rounded-full inset-ring-1 inset-ring-gray-100 shadow"
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
