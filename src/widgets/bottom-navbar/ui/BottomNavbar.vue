<template>
  <div class="fixed left-0 bottom-0 p-4 w-full">
    <BottomNavbarItems>
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
    </BottomNavbarItems>
  </div>
</template>

<script setup lang="ts">
import BottomNavbarItem from './BottomNavbarItem.vue'
import BottomNavbarItems from './BottomNavbarItems.vue'
</script>
