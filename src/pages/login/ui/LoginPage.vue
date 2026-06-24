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
            <SelectContent align="center" side="bottom" :side-offset="5">
              <SelectViewport>
                <SelectItem value="male">
                  <SelectItemText>Мужской</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
                <SelectItem value="female">
                  <SelectItemText>Женский</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
                <SelectItem value="other">
                  <SelectItemText>Другой</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
              </SelectViewport>
            </SelectContent>
          </SelectPortal>
        </SelectRoot>
      </div>

      <div class="flex flex-col gap-4">
        <Button type="submit">Зарегистрироваться</Button>
        <Button variant="secondary">У меня есть аккаунт</Button>
      </div>
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
  SelectItemText,
  SelectItemIndicator,
  SelectPortal,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from '~/shared/ui/select'
</script>
