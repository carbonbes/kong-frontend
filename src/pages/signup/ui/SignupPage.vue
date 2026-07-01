<template>
  <div class="h-full flex items-center justify-center">
    <Form @submit.prevent="onSubmit">
      <FormFieldGroup>
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel for="email">Почта</FormLabel>
            <FormInput
              v-bind="componentField"
              id="email"
              rounded="large"
              type="email"
            />
            <FormErrorMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel for="name">Имя</FormLabel>
            <FormInput
              v-bind="componentField"
              id="name"
              rounded="large"
              type="text"
            />
            <FormErrorMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ handleBlur, handleChange, value }" name="gender">
          <FormItem>
            <FormLabel for="gender">Гендер</FormLabel>

            <SelectRoot :model-value="value" @update:model-value="handleChange">
              <SelectTrigger as-child>
                <FormSelectTrigger
                  id="gender"
                  rounded="large"
                  @blur="handleBlur"
                >
                  <SelectValue />
                  <SelectIcon />
                </FormSelectTrigger>
              </SelectTrigger>

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

            <FormErrorMessage />
          </FormItem>
        </FormField>
      </FormFieldGroup>

      <FormFooter>
        <Button rounded="large" type="submit">Зарегистрироваться</Button>
        <Button rounded="large" variant="secondary">У меня есть аккаунт</Button>
      </FormFooter>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Button } from '~/shared/ui/button'
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
import {
  Form,
  FormErrorMessage,
  FormField,
  FormFieldGroup,
  FormFooter,
  FormInput,
  FormItem,
  FormLabel,
  FormSelectTrigger,
} from '~/shared/ui/form'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

const validationSchema = toTypedSchema(
  z.object({
    email: z.string().email().max(100),
    name: z.string().trim().min(1).max(100),
    gender: z.union([
      z.literal('male'),
      z.literal('female'),
      z.literal('other'),
    ]),
  }),
)

const form = useForm({ validationSchema })

const onSubmit = form.handleSubmit((values) => {})
</script>
