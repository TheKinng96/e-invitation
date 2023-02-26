<script lang="ts" setup>
import useModal from '@/_store/modal';
import { useI18n } from 'vue-i18n';
import * as yup from 'yup';
import InputFieldWithValidations from '@/shared/forms/InputFieldWithValidations.vue';
import { ref } from 'vue';
import { Form } from 'vee-validate';
import { useUser } from '@/_store/user';
import { ILogin } from '@/_store/user/types';

const { t } = useI18n();
const user = useUser();
const isLoading = ref(false);
const modal = useModal();
const close = () => {
  modal.setClosingAnimation();
  setTimeout(() => {
    modal.close();
  }, 500);
};
const errorMessage = ref<string>();

// Validation rules
const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const login = async (values: any) => {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    user.logUserIn(values);
    close();
  } catch (err: any) {
    errorMessage.value = t('login_failed');
  }

  isLoading.value = false;
};
</script>

<template>
  <div class="login-modal" :class="{ closing: modal.isClosing }">
    <button @click="close()" class="close-button">x</button>

    <h6>Welcome Back!</h6>
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
          class="button-m button"
          type="submit"
          :disabled="!meta.valid || isLoading"
        >
          {{ t(`register`) }}
        </v-btn>
      </div>
    </Form>
  </div>
</template>

<style lang="scss" scoped>
.login-modal {
  background: white;
  box-shadow: 0px 2px 8px rgba(34, 41, 149, 0.06),
    0px 4px 16px rgba(34, 41, 149, 0.04);
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 42rem;
  margin: auto;
  padding: 2rem;
  border-radius: 1rem;
  transition: all ease-in-out 0.5s;
  max-height: 100svh;
  position: relative;

  &.closing {
    transform: translateY(-50%);
    opacity: 0;
  }
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
