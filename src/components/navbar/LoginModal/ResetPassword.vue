<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import * as yup from 'yup';
import InputFieldWithValidations from '@/shared/forms/InputFieldWithValidations.vue';
import { ref } from 'vue';
import { Form } from 'vee-validate';
import pb from '@/services/pb';
import { useToast } from '@/_store/toast';
import { ToastType } from '@/_store/toast/types';

const { t } = useI18n();
const toast = useToast();
const isLoading = ref(false);
const errorMessage = ref('');

const emit = defineEmits(['updateComponent']);

const props = defineProps<{
  scrollToRegister: Function;
}>();

// reset rules
const schema = yup.object({
  email: yup.string().email().required(),
});

const resetPassword = async ({ email }: any) => {
  try {
    await pb.collection('users').requestPasswordReset(email);
    toast.append({
      type: ToastType.success,
      message: 'Reset password email sent',
    });
  } catch ({ message }: any) {
    errorMessage.value = message;
    toast.append({
      type: ToastType.danger,
      message: message ? (message as string) : 'Something went wrong',
    });
  }
};
</script>

<template>
  <div v-if="errorMessage" class="error">
    {{ errorMessage }}
  </div>

  <Form :validation-schema="schema" @submit="resetPassword" v-slot="{ meta }">
    <InputFieldWithValidations
      id="loginEmail"
      name="email"
      :label="t('email')"
      type="email"
      placeholder="johndoe@gmail.com"
      :isRequired="true"
    />
    <div class="buttons mt-4">
      <v-btn
        class="primary-btn login-button button-m button"
        type="submit"
        :disabled="!meta.valid || isLoading"
        :loading="isLoading"
      >
        {{ t(`resend_verification_email`) }}
      </v-btn>
      <v-btn
        type="submit"
        class="button-m button secondary-btn"
        :disabled="!meta.valid || isLoading"
      >
        {{ t(`forgot_password`) }}
      </v-btn>
    </div>
  </Form>

  <div class="extra">
    <button @click="emit('updateComponent', 'Login')">
      {{ t(`login`) }}
    </button>
    <button @click="props.scrollToRegister">
      {{ t(`register`) }}
    </button>
    <button @click="emit('updateComponent', 'ResendVerification')">
      {{ t(`resend_verification`) }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.login-modal-content {
  width: 100%;
}

.extra {
  display: flex;
  flex-direction: column;
  align-items: start;
  color: $color-neutral-400;
  margin-top: 1rem;
}

.form {
  width: 100%;
}

.buttons {
  width: 100%;
  display: flex;
  gap: 1rem;

  > .button {
    flex: 1;
  }
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.error {
  width: 100%;
  margin: 1rem 0;
  color: $color-accent-500;
}
</style>
