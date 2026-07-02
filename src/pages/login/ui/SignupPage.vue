<template>
  <div class="h-full flex items-center justify-center">
    <Form v-if="step === 0" @submit.prevent="onSubmit">
      <FormFieldGroup>
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel for="email">Почта</FormLabel>
            <FormInput
              v-bind="componentField"
              id="email"
              type="email"
              :disabled="isLoading"
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
              type="text"
              :disabled="isLoading"
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
                  @blur="handleBlur"
                  :disabled="isLoading"
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
        <Button type="submit">Зарегистрироваться</Button>
        <Button variant="secondary" :disabled="isLoading">
          У меня есть аккаунт
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
import { PinInputInput, PinInputRoot } from '~/shared/ui/pin-input'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { signupValidationSchema } from '~/pages/login/model/signup-validation-schema'
import { useSignup } from '~/pages/login/model/use-signup'

const { isLoading, refetch } = useSignup()

const step = ref<0 | 1>(0)

const { handleSubmit } = useForm({ validationSchema: signupValidationSchema })

const onSubmit = handleSubmit((values) => {})
</script>
