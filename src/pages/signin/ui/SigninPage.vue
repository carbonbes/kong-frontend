<template>
  <div class="h-full flex items-center justify-center">
    <Form @submit.prevent="onSubmit">
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

      <FormFooter>
        <Button rounded="large" type="submit">Войти</Button>
        <Button rounded="large" variant="secondary">У меня нет аккаунта</Button>
      </FormFooter>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Button } from '~/shared/ui/button'
import {
  Form,
  FormErrorMessage,
  FormField,
  FormFooter,
  FormInput,
  FormItem,
  FormLabel,
} from '~/shared/ui/form'
import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

const validationSchema = toTypedSchema(
  z.object({
    email: z.string().email().max(100),
  }),
)

const form = useForm({ validationSchema })

const onSubmit = form.handleSubmit((values) => {})
</script>
