<template>
  <LoginView>
    <LoginFormStep v-if="step === 0">
      <LoginForm @submit.prevent="onSubmit">
        <LoginFormFieldGroup>
          <LoginFormField
            v-slot="{ componentField, errorMessage }"
            name="email"
          >
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

              <SelectRoot
                :model-value="value"
                @update:model-value="handleChange"
              >
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
          <Button type="submit" :disabled="isLoading">
            Зарегистрироваться
          </Button>

          <Button as-child variant="secondary" :disabled="isLoading">
            <NuxtLink
              :to="{ name: 'SigninPage' }"
              class="flex items-center justify-center"
            >
              У меня есть аккаунт
            </NuxtLink>
          </Button>
        </LoginFormFooter>
      </LoginForm>
    </LoginFormStep>

    <LoginFormStep v-else-if="step === 1">
      <div class="flex flex-col items-center gap-2">
        <p class="text-lg font-bold">Введите код</p>
        <p class="text-gray-500">Он был отправлен на указанную почту</p>
      </div>

      <PinInputRoot>
        <PinInputInput v-for="(key, index) in 6" :key :index />
      </PinInputRoot>
    </LoginFormStep>
  </LoginView>
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
import { PinInputInput, PinInputRoot } from '~/shared/ui/pin-input'
import { Field as LoginFormField, useForm } from 'vee-validate'
import { signupValidationSchema } from '../model/signup-validation.schema'
import { useSignup } from '../model/use-signup.mutation'
import { Input } from '~/shared/ui/input'
import { useToasts } from '~/shared/model'
import LoginView from './LoginView.vue'
import LoginForm from './LoginForm.vue'
import LoginFormFieldGroup from './LoginFormFieldGroup.vue'
import LoginFormItem from './LoginFormItem.vue'
import LoginFormLabel from './LoginFormLabel.vue'
import LoginFormErrorMessage from './LoginFormErrorMessage.vue'
import LoginFormSelectTrigger from './LoginFormSelectTrigger.vue'
import LoginFormFooter from './LoginFormFooter.vue'
import LoginFormStep from './LoginFormStep.vue'

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
