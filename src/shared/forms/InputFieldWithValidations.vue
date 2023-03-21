<script setup lang="ts">
import { ref } from 'vue';
import { toRef } from 'vue';
import { FieldMeta, useField } from 'vee-validate';

const props = withDefaults(
  defineProps<{
    name: string;
    type?: string;
    label: string;
    hideDetail?: boolean;
    hasNoMargin?: boolean;
    isRequired?: boolean;
    errorMessages?: string[];
    messages?: string[];
    disabled?: boolean;
    hasValidationIcon?: boolean;
    isPasswordField?: boolean;
    hasRequiredMark?: boolean;
    description?: string;
    hasNoLabel?: boolean;
  }>(),
  {
    type: 'text',
    disabled: false,
  },
);

// Password setup
const showPassword = ref(false);

const getIcon = (errors: string[], meta: FieldMeta<any>): string => {
  if (props.isPasswordField) {
    return showPassword.value ? 'mdi-eye-off-outline' : 'mdi-eye-outline';
  }

  if (!meta.dirty || !props.hasValidationIcon) {
    return '';
  }

  return errors.length > 0
    ? 'fas fa-exclamation-triangle '
    : 'fas fa-check-circle has-text-success';
};

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

const getType = (): string => {
  if (props.isPasswordField) {
    return showPassword.value ? 'string' : 'password';
  }

  return props.type;
};

const { value, handleBlur, errors, meta } = useField(
  toRef(props, 'name'),
  undefined,
);
</script>

<template>
  <div>
    <span class="input-label" :class="{ 'has-no-label': props.hasNoLabel }">{{
      props.label
    }}</span>
    <v-text-field
      v-model="value"
      v-bind="$props"
      :type="getType()"
      @blur="handleBlur"
      :error-messages="getErrorMessages(errors)"
      :hide-details="props.hideDetail ?? false"
      :messages="messages"
      :disabled="disabled"
      single-line
      class="input-field"
      :class="[
        getClass(errors, meta),
        {
          'no-margin': props.hasNoMargin,
          'is-required': props.isRequired && props.hasRequiredMark,
          'has-description': props.description,
        },
      ]"
      :append-inner-icon="getIcon(errors, meta)"
      @click:append-inner="showPassword = !showPassword"
      variant="outlined"
    />
    <span
      v-if="props.description"
      class="extra-description"
      v-html="props.description"
    />
  </div>
</template>

<style lang="scss" scoped>
.has-no-label {
  display: none;
}

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

.input-field {
  margin-top: 0.5rem;
  position: relative;
  --v-input-control-height: 48px;
  --v-input-padding-top: 12px;

  &.v-field--error {
    margin-bottom: 1rem;
  }

  :deep(.v-input__details) {
    padding: 0;
    padding-top: 0.5rem;
    min-height: auto;
  }

  :deep(.v-input__control) {
    input {
      padding: 8px 16px;
      align-items: center;
    }

    .v-field--disabled {
      background-color: $color-neutral-100;
    }
  }

  &.has-description {
    &.v-field--error {
      margin-bottom: 0rem;
      :deep(.v-input__details) {
        display: block;
      }
    }

    :deep(.v-input__details) {
      display: none;
    }
  }

  &.no-margin {
    margin-bottom: 0;
  }

  &.is-required::after {
    content: '※';
    color: rgb(var(--v-theme-danger));
    position: absolute;
    left: -1rem;
    top: 0;
    font-size: 1em;
    transform: translateY(50%);
  }
}

@media screen and (max-width: $sm-breakpoint-max) {
  .input-field {
    :deep(.v-input__details) {
      padding-top: 0;
    }
  }
}
</style>
