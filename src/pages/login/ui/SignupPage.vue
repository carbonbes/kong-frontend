<template>
  <div class="h-full flex items-center justify-center">
    <Form v-if="step === 0" @submit.prevent="onSubmit">
      <FormFieldGroup>
        <FormField v-slot="{ componentField, errorMessage }" name="email">
          <FormItem>
            <FormLabel for="email" :error="!!errorMessage">Почта</FormLabel>

            <Input
              v-bind="componentField"
              type="email"
              :disabled="isLoading"
              :error="!!errorMessage"
            />

            <FormErrorMessage name="email" />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField, errorMessage }" name="name">
          <FormItem>
            <FormLabel for="name" :error="!!errorMessage">Имя</FormLabel>

            <Input
              v-bind="componentField"
              type="text"
              :disabled="isLoading"
              :error="!!errorMessage"
            />

            <FormErrorMessage name="name" />
          </FormItem>
        </FormField>

        <FormField
          v-slot="{ errorMessage, handleBlur, handleChange, value }"
          name="gender"
        >
          <FormItem>
            <FormLabel for="gender" :error="!!errorMessage">Гендер</FormLabel>

            <SelectRoot :model-value="value" @update:model-value="handleChange">
              <SelectTrigger as-child>
                <FormSelectTrigger
                  :disabled="isLoading"
                  :error="!!errorMessage"
                  name="gender"
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

            <FormErrorMessage name="gender" />
          </FormItem>
        </FormField>
      </FormFieldGroup>

      <FormFooter>
        <Button type="submit">Зарегистрироваться</Button>
        <Button variant="secondary" :disabled="isLoading">
          У меня есть аккаунт
        </Button>
      </FormFooter>
    </Form>

    <div v-else-if="step === 1" class="flex flex-col gap-8">
      <div class="flex flex-col items-center gap-2">
        <p class="text-lg font-bold">Введите код</p>
        <p class="text-gray-500">Он был отправлен на указанную почту</p>
      </div>

      <PinInputRoot>
        <PinInputInput v-for="(key, index) in 6" :key :index />
      </PinInputRoot>
    </div>
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
  FormItem,
  FormLabel,
  FormSelectTrigger,
} from '~/shared/ui/form'
import { PinInputInput, PinInputRoot } from '~/shared/ui/pin-input'
import { useForm } from 'vee-validate'
import { signupValidationSchema } from '../model/signup-validation.schema'
import { useSignup } from '../model/use-signup.mutation'
import { Input } from '~/shared/ui/input'
import { useToasts } from '~/shared/model'

const step = ref<0 | 1>(0)

const { handleSubmit } = useForm({ validationSchema: signupValidationSchema })
const { error, isLoading, mutate: signup, status } = useSignup()
const { errorToastify } = useToasts()

watch(status, (value) => {
  if (value === 'success') {
    step.value = 1
  }

  if (value === 'error') {
    errorToastify({
      title: 'Ошибка',
      description: error.value?.message || 'Неизвестная ошибка',
    })
  }
})

const onSubmit = handleSubmit(signup)
</script>
