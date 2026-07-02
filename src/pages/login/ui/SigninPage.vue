<template>
  <div class="h-full flex items-center justify-center">
    <Form v-if="step === 0" @submit.prevent="onSubmit">
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel for="email">Почта</FormLabel>
          <FormInput v-bind="componentField" id="email" type="email" />
          <FormErrorMessage />
        </FormItem>
      </FormField>

      <FormFooter>
        <Button type="submit">Войти</Button>
        <Button variant="secondary">У меня нет аккаунта</Button>
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
  FormInput,
  FormItem,
  FormLabel,
} from '~/shared/ui/form'
import { useForm } from 'vee-validate'
import { signinValidationSchema } from '~/pages/login/model/signin-validation-schema'
import { ref } from 'vue'
import { PinInputInput, PinInputRoot } from '~/shared/ui/pin-input'

const step = ref<0 | 1>(0)

const { handleSubmit } = useForm({ validationSchema: signinValidationSchema })

const onSubmit = handleSubmit((values) => {})
</script>
