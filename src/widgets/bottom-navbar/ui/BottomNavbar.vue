<template>
  <div class="fixed left-0 bottom-0 p-(--bottom-navbar-spacing) w-full">
    <BaseFloating
      class="mx-auto p-1 sm:max-w-60 h-(--bottom-navbar-height) flex justify-between gap-1 bg-white rounded-full"
    >
      <BottomNavbarItem as-child>
        <FeedPageLink data-testid="bottom-navbar/feed-button">
          <BottomNavbarItemIcon name="tabler:home" />
        </FeedPageLink>
      </BottomNavbarItem>

      <BottomNavbarItem as-child>
        <EditorPageLink data-testid="bottom-navbar/editor-button">
          <BottomNavbarItemIcon name="tabler:pencil" />
        </EditorPageLink>
      </BottomNavbarItem>

      <DropdownMenuRoot>
        <DropdownMenuTrigger as-child>
          <BottomNavbarItem data-testid="bottom-navbar/profile-button">
            <BottomNavbarItemIcon name="tabler:user-circle" />
          </BottomNavbarItem>
        </DropdownMenuTrigger>

        <DropdownMenuPortal>
          <DropdownMenuContent
            align="center"
            :side-offset="10"
            data-testid="bottom-navbar/profile-dropdown-menu/content"
          >
            <DropdownMenuItem class="text-red-600" @click="logout">
              <DropdownMenuItemIcon name="tabler:logout" />
              <p>Выйти</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenuRoot>
    </BaseFloating>
  </div>
</template>

<script setup lang="ts">
import BottomNavbarItem from './BottomNavbarItem.vue'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemIcon,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from '~/shared/ui/dropdown'
import { BaseFloating } from '~/shared/ui/base-floating'
import BottomNavbarItemIcon from '~/widgets/bottom-navbar/ui/BottomNavbarItemIcon.vue'
import { EditorPageLink, FeedPageLink } from '~/shared/ui/links'

const { mutate: logout } = useLogout()
</script>
