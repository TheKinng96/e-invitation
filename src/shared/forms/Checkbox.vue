<script setup lang="ts">
import { Field } from 'vee-validate';

export interface ICheckbox {
  name: string;
  label?: string;
  default?: boolean;
  color?: string;
}

const props = withDefaults(defineProps<ICheckbox>(), {
  name: 'field name',
  label: 'checkbox',
  default: false,
  color: 'primary',
});
</script>

<template>
  <Field
    :name="props.name"
    :value="props.default"
    type="checkbox"
    v-slot="{ value, handleChange, errors }"
  >
    <v-checkbox
      :model-value="value"
      @update:modelValue="handleChange"
      :color="props.color"
      :error-messages="errors"
      :label="label"
      class="checkbox"
    >
      <template #label><slot></slot></template>
    </v-checkbox>
  </Field>
</template>

<style lang="scss" scoped>
.checkbox {
  margin-bottom: 2.5rem;

  :deep(.v-input__details) {
    margin-top: -1rem;
  }
}
</style>
