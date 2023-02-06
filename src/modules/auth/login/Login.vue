<script setup lang="ts">
import { Form } from 'vee-validate';
import * as yup from 'yup';
import InputFieldWithValidations from '@/shared/forms/InputFieldWithValidations.vue';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import Api from '@/services/auth.api';
import { useUser } from '@/_store/user';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from '@/_store/toast';
import { ToastType } from '@/_store/toast/types';

// i18n
const { t } = useI18n();

// Pinia
const toast = useToast();
const user = useUser();

// Route
const router = useRouter();
const route = useRoute();

// Validation rules
const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const keepLogin = ref(true);
const isLoading = ref(false);

const login = (values: any) => {
  isLoading.value = true;

  Api.loginRequest(values)
    .then((response) => {
      router.push({ name: 'dashboard' });
      toast.append({ message: t('authentication.login_successfully') });

      // Wont save user data to localstorage
      if (keepLogin.value) {
        user.logUserIn(response.data);
      }
    })
    .catch((error) => {
      // Show notification
      toast.append({
        message: t('form.wrong_credential').toString(),
        type: ToastType.danger,
        isSnackbar: true,
      });
      // TODO - sentry
    })
    .finally(() => (isLoading.value = false));
};
</script>

<template>
  <main>
    <Form :validation-schema="schema" @submit="login" v-slot="{ meta }">
      <InputFieldWithValidations
        id="loginEmail"
        name="email"
        :label="t('form.email')"
        type="email"
        placeholder="johndoe@gmail.com"
        :isRequired="true"
        :has-no-label="true"
      />

      <InputFieldWithValidations
        name="password"
        :label="t('form.password')"
        id="loginPassword"
        :hideDetail="true"
        :hasNoMargin="true"
        :isPasswordField="true"
        :has-no-label="true"
      />

      <v-checkbox
        :label="t('form.keep_login')"
        class="show-password body-md"
        v-model="keepLogin"
        hide-details
        color="primary"
      />

      <v-btn
        class="primary-btn mt-4 login-button button-m"
        type="submit"
        :disabled="!meta.valid || isLoading"
        :loading="isLoading"
      >
        {{ t(`authentication.form_button_${route.meta?.title}`) }}
      </v-btn>
    </Form>

    <div class="extra-actions mt-3">
      <router-link
        id="recoverPasswordRouter"
        to="/password/recover"
        class="forgot-password button-m text-primary"
      >
        {{ t('authentication.forgot_password') }}
      </router-link>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.login-button {
  width: 100%;
}

.show-password {
  color: $color-neutral-800;
}

.forgot-password {
  transition: 0.25s;

  &:hover {
    color: rgb(var(--v-theme-grey-hover));
  }
}

.extra-actions {
  display: flex;
  flex-direction: column;
}
</style>
