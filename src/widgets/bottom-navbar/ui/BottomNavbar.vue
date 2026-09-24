<template>
  <div class="fixed left-0 bottom-0 p-4 w-full">
    <div
      class="mx-auto p-1 sm:max-w-160 flex justify-between gap-1 bg-white rounded-full inset-ring-1 inset-ring-gray-200/75 shadow-md"
    >
      <BottomNavbarItem as-child>
        <NuxtLink :to="{ name: 'FeedPage' }">
          <Icon name="tabler:home" class="size-6" />
        </NuxtLink>
      </BottomNavbarItem>

      <BottomNavbarItem as-child>
        <NuxtLink :to="{ name: 'EditorPage' }">
          <Icon name="tabler:pencil" class="size-6" />
        </NuxtLink>
      </BottomNavbarItem>

      <PopoverRoot>
        <PopoverTrigger as-child>
          <BottomNavbarItem data-testid="bottom-navbar/profile-button">
            <Icon name="tabler:user-circle" class="size-6" />
          </BottomNavbarItem>
        </PopoverTrigger>

        <PopoverPortal>
          <PopoverContent align="center" :side-offset="10">
            <PopoverContentButton
              class="flex items-center gap-2 text-red-600"
              @click="logout"
            >
              <Icon name="tabler:logout" class="size-6" />
              Выйти
            </PopoverContentButton>
          </PopoverContent>
        </PopoverPortal>
      </PopoverRoot>
    </div>
  </div>
</template>

<script setup lang="ts">
import BottomNavbarItem from './BottomNavbarItem.vue'
import {
  PopoverContent,
  PopoverContentButton,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
} from '~/shared/ui/popover'

const { mutate: logout } = useLogout()
</script>
