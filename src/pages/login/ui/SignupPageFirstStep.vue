<template>
  <div class="w-full h-full flex items-center justify-center">
    <LoginForm @submit.prevent="onSubmit">
      <LoginFormFieldGroup>
        <LoginFormField v-slot="{ componentField, errorMessage }" name="email">
          <LoginFormItem>
            <LoginFormLabel for="email" :error="!!errorMessage">
              Почта
            </LoginFormLabel>

            <Input
              v-bind="componentField"
              type="email"
              :disabled="isLoading"
              :error="!!errorMessage"
            />

            <LoginFormErrorMessage name="email" />
          </LoginFormItem>
        </LoginFormField>

        <LoginFormField v-slot="{ componentField, errorMessage }" name="name">
          <LoginFormItem>
            <LoginFormLabel for="name" :error="!!errorMessage">
              Имя
            </LoginFormLabel>

            <Input
              v-bind="componentField"
              type="text"
              :disabled="isLoading"
              :error="!!errorMessage"
            />

            <LoginFormErrorMessage name="name" />
          </LoginFormItem>
        </LoginFormField>

        <LoginFormField
          v-slot="{ errorMessage, handleBlur, handleChange, value }"
          name="gender"
        >
          <LoginFormItem>
            <LoginFormLabel for="gender" :error="!!errorMessage">
              Гендер
            </LoginFormLabel>

            <SelectRoot :model-value="value" @update:model-value="handleChange">
              <SelectTrigger as-child>
                <LoginFormSelectTrigger
                  :disabled="isLoading"
                  :error="!!errorMessage"
                  name="gender"
                  @blur="handleBlur"
                >
                  <SelectValue />
                  <SelectIcon />
                </LoginFormSelectTrigger>
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

            <LoginFormErrorMessage name="gender" />
          </LoginFormItem>
        </LoginFormField>
      </LoginFormFieldGroup>

      <LoginFormFooter>
        <Button :disabled="isLoading" type="submit">
          Зарегистрироваться
        </Button>

        <Button
          as-child
          class="flex items-center justify-center"
          :disabled="isLoading"
          variant="secondary"
        >
          <NuxtLink :to="{ name: 'SigninPage' }">
            У меня есть аккаунт
          </NuxtLink>
        </Button>
      </LoginFormFooter>
    </LoginForm>
  </div>
</template>

<script setup lang="ts">
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
import { Button } from '~/shared/ui/button'
import LoginFormLabel from '~/pages/login/ui/LoginFormLabel.vue'
import LoginFormItem from '~/pages/login/ui/LoginFormItem.vue'
import LoginForm from '~/pages/login/ui/LoginForm.vue'
import { Input } from '~/shared/ui/input'
import LoginFormSelectTrigger from '~/pages/login/ui/LoginFormSelectTrigger.vue'
import LoginFormFieldGroup from '~/pages/login/ui/LoginFormFieldGroup.vue'
import LoginFormFooter from '~/pages/login/ui/LoginFormFooter.vue'
import LoginFormErrorMessage from '~/pages/login/ui/LoginFormErrorMessage.vue'
import { Field as LoginFormField } from 'vee-validate'
import { signupValidationSchema } from '~/pages/login/model/signup-validation.schema'
import { useSignup } from '~/pages/login/model/use-signup.mutation'
import { useToasts } from '~/shared/model'
import type { LoginPageStepEmits } from '~/pages/login/ui/login-page-step.emits.interface'
import { injectSignupPageContext } from '~/pages/login/ui/SignupPage.vue'

const emits = defineEmits<LoginPageStepEmits>()

const { formValues } = injectSignupPageContext()

const { handleSubmit } = useForm({ validationSchema: signupValidationSchema })
const { error, isLoading, mutate: signup, status } = useSignup()
const { errorToastify } = useToasts()

watch(status, (value) => {
  if (value === 'success') {
    emits('next')
  }

  if (value === 'error') {
    errorToastify({
      title: 'Ошибка',
      description: error.value?.message || 'Неизвестная ошибка',
    })
  }
})

const onSubmit = handleSubmit((values) => {
  formValues = values
  signup(values)
})
</script>
