<template>
  <LoginPage>
    <LoginPageStep
      v-show="step === 0"
      data-testid="login-page/signup/first-step"
    >
      <LoginForm @submit.prevent="onSubmit">
        <LoginFormFieldGroup
          class="relative sm:static top-full sm:top-[unset] -translate-y-1/2 sm:translate-[unset] h-fit sm:h-[unset]"
        >
          <LoginFormField
            v-slot="{ componentField, errorMessage }"
            name="email"
          >
            <LoginFormItem>
              <LoginFormLabel
                :error="!!errorMessage"
                for="email"
                data-testid="login-page/signup/first-step/email-input/label"
              >
                Почта
              </LoginFormLabel>

              <Input
                v-bind="componentField"
                :disabled="signupIsLoading"
                :error="!!errorMessage"
                type="email"
                data-testid="login-page/signup/first-step/email-input/input"
              />

              <LoginFormErrorMessage
                name="email"
                data-testid="login-page/signup/first-step/email-input/error-message"
              />
            </LoginFormItem>
          </LoginFormField>

          <LoginFormField v-slot="{ componentField, errorMessage }" name="name">
            <LoginFormItem>
              <LoginFormLabel
                :error="!!errorMessage"
                for="name"
                data-testid="login-page/signup/first-step/name-input/label"
              >
                Имя
              </LoginFormLabel>

              <Input
                v-bind="componentField"
                :disabled="signupIsLoading"
                :error="!!errorMessage"
                type="text"
                data-testid="login-page/signup/first-step/name-input/input"
              />

              <LoginFormErrorMessage
                name="name"
                data-testid="login-page/signup/first-step/name-input/error-message"
              />
            </LoginFormItem>
          </LoginFormField>

          <LoginFormField
            v-slot="{ errorMessage, handleBlur, handleChange, value }"
            name="gender"
          >
            <LoginFormItem>
              <LoginFormLabel
                :error="!!errorMessage"
                for="gender"
                data-testid="login-page/signup/first-step/gender-select/label"
              >
                Гендер
              </LoginFormLabel>

              <SelectRoot
                :model-value="value"
                @update:model-value="handleChange"
              >
                <SelectTrigger as-child>
                  <LoginFormSelectTrigger
                    :disabled="signupIsLoading"
                    :error="!!errorMessage"
                    name="gender"
                    data-testid="login-page/signup/first-step/gender-select/trigger"
                    @blur="handleBlur"
                  >
                    <SelectValue />
                    <SelectIcon />
                  </LoginFormSelectTrigger>
                </SelectTrigger>

                <SelectPortal>
                  <SelectContent class="w-(--reka-popper-anchor-width)">
                    <SelectViewport>
                      <SelectItem
                        value="male"
                        data-testid="login-page/signup/first-step/gender-select/option/male"
                      >
                        <SelectItemText>Мужской</SelectItemText>
                        <SelectItemIndicator />
                      </SelectItem>

                      <SelectItem
                        value="female"
                        data-testid="login-page/signup/first-step/gender-select/option/female"
                      >
                        <SelectItemText>Женский</SelectItemText>
                        <SelectItemIndicator />
                      </SelectItem>

                      <SelectItem
                        value="other"
                        data-testid="login-page/signup/first-step/gender-select/option/other"
                      >
                        <SelectItemText>Другой</SelectItemText>
                        <SelectItemIndicator />
                      </SelectItem>
                    </SelectViewport>
                  </SelectContent>
                </SelectPortal>
              </SelectRoot>

              <LoginFormErrorMessage
                name="gender"
                data-testid="login-page/signup/first-step/gender-select/error-message"
              />
            </LoginFormItem>
          </LoginFormField>
        </LoginFormFieldGroup>

        <LoginFormFooter>
          <Button
            :disabled="signupIsLoading"
            type="submit"
            data-testid="login-page/signup/first-step/submit-button"
          >
            Зарегистрироваться
          </Button>

          <Button
            as-child
            class="flex items-center justify-center"
            :disabled="signupIsLoading"
            variant="tertiary"
          >
            <NuxtLink
              :to="{ name: 'SigninPage' }"
              data-testid="login-page/signup/first-step/signin-link"
            >
              У меня есть аккаунт
            </NuxtLink>
          </Button>
        </LoginFormFooter>
      </LoginForm>
    </LoginPageStep>

    <LoginPageStep v-if="step === 1">
      <LoginPageVerifyOtp
        :email="values.email!"
        type="signup"
        @back="() => (step = 0)"
      />
    </LoginPageStep>
  </LoginPage>
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
import LoginFormLabel from './LoginFormLabel.vue'
import LoginFormErrorMessage from './LoginFormErrorMessage.vue'
import LoginFormFieldGroup from './LoginFormFieldGroup.vue'
import LoginFormItem from './LoginFormItem.vue'
import LoginFormFooter from './LoginFormFooter.vue'
import LoginFormSelectTrigger from './LoginFormSelectTrigger.vue'
import LoginForm from './LoginForm.vue'
import { signupValidationSchema } from '../model/signup-validation.schema'
import { Input } from '~/shared/ui/input'
import { Field as LoginFormField } from 'vee-validate'
import { signup, type SignupOptions } from '../api/signup'
import LoginPage from './LoginPage.vue'
import LoginPageStep from './LoginPageStep.vue'
import LoginPageVerifyOtp from './LoginPageVerifyOtp.vue'
import { useToasts } from '~/shared/model'

const { errorToastify } = useToasts()

const step = ref<0 | 1>(0)

const { handleSubmit, values } = useForm({
  validationSchema: signupValidationSchema,
})

const { isLoading: signupIsLoading, mutate: signupMutation } = useMutation({
  mutation: (options: SignupOptions) => signup(options),

  onError: (error) => {
    errorToastify({
      title: 'Ошибка',
      description: error.message,
    })
  },

  onSuccess: () => {
    step.value = 1
  },
})

const onSubmit = handleSubmit(signupMutation)
</script>
