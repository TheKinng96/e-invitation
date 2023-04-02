<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import * as yup from 'yup';
import InputFieldWithValidations from '@/shared/forms/InputFieldWithValidations.vue';
import { Form } from 'vee-validate';
import { ref } from 'vue';
import { useUser } from '@/_store/user';
import { useToast } from '@/_store/toast';
import useModal from '@/_store/modal';
import { ToastType } from '@/_store/toast/types';

const { t } = useI18n();
const isLoading = ref(false);
const errorMessage = ref('');
const user = useUser();
const toast = useToast();
const modal = useModal();
const close = () => {
  modal.setClosingAnimation();
  setTimeout(() => {
    modal.close();
  }, 500);
};

const emit = defineEmits(['updateComponent']);

const props = defineProps<{
  scrollToRegister: Function;
}>();

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const login = async (values: any) => {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    user.logUserIn(values);
    toast.append({
      type: ToastType.success,
      message: 'Login successful',
    });
    close();
  } catch (err: any) {
    errorMessage.value = t('login_failed');
  }

  isLoading.value = false;
};
</script>

<template>
  <div v-if="errorMessage" class="error">
    {{ errorMessage }}
  </div>

  <Form
    :validation-schema="schema"
    @submit="login"
    v-slot="{ meta }"
    class="form"
  >
    <InputFieldWithValidations
      id="loginEmail"
      name="email"
      :label="t('email')"
      type="email"
      placeholder="johndoe@gmail.com"
      :isRequired="true"
    />

    <InputFieldWithValidations
      name="password"
      :label="t('password')"
      id="loginPassword"
      :hideDetail="true"
      :hasNoMargin="true"
      :isPasswordField="true"
    />

    <div class="buttons mt-4">
      <v-btn
        class="primary-btn login-button button-m button"
        type="submit"
        :disabled="!meta.valid || isLoading"
        :loading="isLoading"
      >
        {{ t(`login`) }}
      </v-btn>
      <v-btn
        class="button-m button secondary-btn"
        @click="props.scrollToRegister()"
      >
        {{ t(`register`) }}
      </v-btn>
    </div>
  </Form>

  <div class="extra">
    <button @click="emit('updateComponent', 'ResetPassword')">
      {{ t(`forgot_password`) }}
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
