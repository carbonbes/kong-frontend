import { FieldContextKey } from 'vee-validate'
import { computed, inject } from 'vue'

export function useFormField() {
  const fieldContext = inject(FieldContextKey)

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>')
  }

  const { name, errorMessage: error, meta } = fieldContext

  const fieldState = {
    valid: computed(() => meta.valid),
    isDirty: computed(() => meta.dirty),
    isTouched: computed(() => meta.touched),
    error,
  }

  return {
    name,
    ...fieldState,
  }
}
