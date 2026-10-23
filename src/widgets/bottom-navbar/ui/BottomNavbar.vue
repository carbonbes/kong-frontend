<template>
  <div
    id="bottom-navbar"
    class="fixed left-1/2 bottom-0 -translate-x-1/2 m-(--bottom-navbar-spacing) p-1 w-full sm:max-w-60 h-(--bottom-navbar-height) flex justify-between gap-1 rounded-full shadow-md/5"
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
          <DropdownMenuItem class="text-red-600" @click="logoutMutation">
            <DropdownMenuItemIcon name="tabler:logout" />
            <p>Выйти</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
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
import BottomNavbarItemIcon from '~/widgets/bottom-navbar/ui/BottomNavbarItemIcon.vue'
import { EditorPageLink, FeedPageLink } from '~/shared/ui/links'
import { logout } from '~/shared/api'
import { useAuthQueryOptions, useLiquidGlass } from '~/shared/model'

const { errorToastify, successToastify } = useToasts()
const authQueryOptions = useAuthQueryOptions()
const queryCache = useQueryCache()
const router = useRouter()

const { mutate: logoutMutation } = useMutation({
  mutation: logout,

  onError: () => {
    errorToastify({
      title: 'Ошибка',
      description: 'Не удалось выйти из аккаунта',
    })
  },

  onSuccess: () => {
    queryCache.cancelQueries({ key: authQueryOptions.key })
    queryCache.invalidateQueries({ key: authQueryOptions.key }, false)
    successToastify({ title: 'Успех', description: 'Вы вышли из аккаунта' })
    router.push({ name: 'SigninPage' })
  },
})

useLiquidGlass({
  root: document?.querySelector('#bottom-navbar')!,
  glassElements: document?.querySelectorAll('#bottom-navbar-item')!,
  defaults: {
    blurAmount: 0.5,
    brightness: 0.15,
    cornerRadius: 50,
    shadowOpacity: 0,
    zRadius: 25,
  },
})
</script>
