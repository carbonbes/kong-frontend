<template>
  <div class="h-full flex items-center justify-center">
    <Form v-if="step === 0" @submit.prevent="onSubmit">
      <FormFieldGroup>
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

        <FormField v-slot="{ componentField, errorMessage }" name="name">
          <FormItem>
            <FormLabel :error="!!errorMessage">Имя</FormLabel>

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
            <FormLabel :error="!!errorMessage">Гендер</FormLabel>

            <SelectRoot :model-value="value" @update:model-value="handleChange">
              <SelectTrigger as-child>
                <FormSelectTrigger
                  :disabled="isLoading"
                  :error="!!errorMessage"
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

    <div v-else-if="step === 1">
      <PinInputRoot>
        <PinInputInput v-for="(key, index) in 6" :key :index />
      </PinInputRoot>
    </div>

    <div v-else></div>
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
import { ref, watch } from 'vue'
import { signupValidationSchema } from '../model/signup-validation.schema'
import { useSignup } from '../model/use-signup.mutation'
import { Input } from '~/shared/ui/input'
import { useToasts } from '~/shared/model'

const step = ref<0 | 1 | 2>(0)

const { handleSubmit } = useForm({ validationSchema: signupValidationSchema })
const { isLoading, mutate: signup, status } = useSignup()
const { errorToastify } = useToasts()

watch(status, (value) => {
  if (value === 'success') {
    step.value = 1
  }

  if (value === 'error') {
    errorToastify({ title: 'Ошибка', description: 'Какая-то ошибка :(' })
  }
})

const onSubmit = handleSubmit(signup)
</script>
