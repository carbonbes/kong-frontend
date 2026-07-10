<template>
  <div class="h-full flex items-center justify-center">
    <Form v-if="step === 0" @submit.prevent="onSubmit">
      <FormField v-slot="{ componentField, errorMessage }" name="email">
        <FormItem>
          <FormLabel :error="!!errorMessage">Почта</FormLabel>
          <Input
            v-bind="componentField"
            type="email"
            :disabled="isLoading"
            :error="!!errorMessage"
          />
          <FormErrorMessage name="email" />
        </FormItem>
      </FormField>

      <FormFooter>
        <Button type="submit">Войти</Button>
        <Button variant="secondary" :disabled="isLoading">
          У меня нет аккаунта
        </Button>
      </FormFooter>
    </Form>

    <div v-else>
      <PinInputRoot>
        <PinInputInput v-for="(key, index) in 6" :key :index />
      </PinInputRoot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '~/shared/ui/button'
import {
  Form,
  FormErrorMessage,
  FormField,
  FormFooter,
  FormItem,
  FormLabel,
} from '~/shared/ui/form'
import { useForm } from 'vee-validate'
import { signinValidationSchema } from '../model/signin-validation.schema'
import { PinInputInput, PinInputRoot } from '~/shared/ui/pin-input'
import { Input } from '~/shared/ui/input'
import { useSignin } from '../model/use-signin.mutation'

const step = ref<0 | 1>(0)

const { handleSubmit } = useForm({ validationSchema: signinValidationSchema })

const { mutate: signin, isLoading } = useSignin()

const onSubmit = handleSubmit(signin)
</script>
