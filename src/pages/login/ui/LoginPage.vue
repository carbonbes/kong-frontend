<template>
  <div class="h-full flex items-center justify-center">
    <form v-if="page === 0" class="flex flex-col gap-14" @submit.prevent="">
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-3">
          <Label>Почта</Label>
          <Input name="email" type="email" />
        </div>

        <div class="flex flex-col gap-3">
          <Label>Имя</Label>
          <Input name="name" type="text" />
        </div>

        <SelectRoot name="gender">
          <div class="flex flex-col gap-3">
            <Label>Гендер</Label>

            <SelectTrigger>
              <SelectValue />
              <SelectIcon />
            </SelectTrigger>
          </div>

          <SelectPortal>
            <SelectContent>
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
        <Button variant="secondary" @click="page = 1">
          У меня есть аккаунт
        </Button>
      </div>
    </form>

    <form v-if="page === 1" class="flex flex-col gap-14" @submit.prevent="">
      <div class="flex flex-col gap-3">
        <Label>Почта</Label>
        <Input name="email" type="email" />
      </div>

      <div class="flex flex-col gap-4">
        <Button type="submit">Войти</Button>
        <Button variant="secondary" @click="page = 0">
          У меня нет аккаунта
        </Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { Button } from '~/shared/ui/button'
import { Input } from '~/shared/ui/input'
import {
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from '~/shared/ui/select'
import { Label } from '~/shared/ui/label'
import { ref } from 'vue'

const page = ref<0 | 1>(0)
</script>
