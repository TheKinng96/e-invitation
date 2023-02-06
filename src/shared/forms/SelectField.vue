<script setup lang="ts">
import { toRef } from 'vue';
import { FieldMeta, useField } from 'vee-validate';
import { strict } from 'assert';

const props = defineProps<{
  name: string;
  label: string;
  hideDetail?: boolean;
  hasNoMargin?: boolean;
  items: any;
  itemTitle?: string;
  itemValue?: string;
  variant?: 'filled' | 'outlined' | 'plain' | 'solo' | 'underlined';
  errorMessages?: string[];
  description?: string;
}>();

const getClass = (errors: string[], meta: FieldMeta<any>): string => {
  if (!meta.dirty) {
    return '';
  }

  return hasErrorMessages() || errors.length > 0 ? 'v-field--error' : '';
};

const getErrorMessages = (errors: string[]): string[] => {
  if (hasErrorMessages()) {
    return props.errorMessages ?? [];
  }

  return errors;
};

const hasErrorMessages = (): boolean => {
  if (!props.errorMessages) return false;
  return props.errorMessages.length > 0;
};

const { value, handleBlur, errors, meta } = useField(
  toRef(props, 'name'),
  undefined,
);
</script>

<template>
  <div>
    <span class="input-label">{{ props.label }}</span>
    <v-select
      class="adsist-select"
      v-model="value"
      v-bind="$props"
      :error-messages="getErrorMessages(errors)"
      :hide-details="props.hideDetail ?? false"
      :label="label"
      :items="items"
      :item-title="itemTitle"
      :item-value="itemValue"
      :variant="variant ?? 'outlined'"
      single-line
      :class="{
        'has-description': props.description,
      }"
    >
    </v-select>
    <span
      v-if="props.description"
      class="extra-description"
      v-html="props.description"
    />
  </div>
</template>

<style lang="scss" scoped>
.input-label {
  @include label-lg;
  color: $color-neutral-800;
}

.extra-description {
  @include body-sm;
  color: $color-neutral-500;
  display: block;
  margin-bottom: 1.25rem;
  margin-top: 0.5rem;

  &:before {
    content: '※';
    margin-right: 2px;
  }
}

.adsist-select {
  margin-top: 0.5rem;

  &.has-description {
    :deep(.v-input__details) {
      display: none;
    }
  }
}
</style>
