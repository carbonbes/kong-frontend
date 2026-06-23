<template>
  <div class="h-full flex items-center justify-center">
    <form class="flex flex-col gap-8" @submit.prevent="">
      <div class="flex flex-col gap-4">
        <Input type="email" placeholder="Почта" />

        <Input type="text" placeholder="Имя" />

        <SelectRoot>
          <SelectTrigger>
            <SelectValue placeholder="Гендер" />
            <SelectIcon />
          </SelectTrigger>

          <SelectPortal>
            <SelectContent align="center" side="bottom">
              <SelectViewport>
                <SelectItem value="male">Мужской</SelectItem>
                <SelectItem value="female">Женский</SelectItem>
                <SelectItem value="other">Другой</SelectItem>
              </SelectViewport>
            </SelectContent>
          </SelectPortal>
        </SelectRoot>
      </div>

      <Button type="submit">Зарегистрироваться</Button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { Button } from '~/shared/ui/button'
import { Input } from '~/shared/ui/input'
import {
  SelectContent,
  SelectRoot,
  SelectIcon,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from '~/shared/ui/select'
</script>
