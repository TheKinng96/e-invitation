<script lang="ts" setup>
import Layout from './Layout.vue';
import { Form } from 'vee-validate';
import * as yup from 'yup';
import InputFieldWithValidations from '@/shared/forms/InputFieldWithValidations.vue';
import Api from '@/services/auth.api';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from '@/_store/toast';

// i18n
const { t } = useI18n();

// Router
const route = useRoute();
const router = useRouter();

// Toast
const toast = useToast();

// Validation rules
const schema = yup.object({
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      t('validation.password_policy').toString(),
    ),
  password_confirmation: yup
    .string()
    .oneOf(
      [yup.ref('password'), null],
      t('validation.error.passwords_must_match'),
    )
    .required(),
});

const isLoading = ref(false);

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const updatePassword = (values: any) => {
  isLoading.value = true;

  let token = route.query.token as string;

  Api.changePassword({ ...values, token })
    .then(() => {
      router.push({ name: 'login' });
      toast.append();
    })
    .catch(() => {
      // TODO - sentry
      toast.append({ message: t('error.system_error') });
    })
    .finally(() => (isLoading.value = false));
};
</script>

<template>
  <Layout>
    <div class="container">
      <div class="change-title has-text-centered">
        <p class="has-text-weight-bold is-size-5">
          {{ $t('authentication.update.title') }}
        </p>
      </div>

      <Form
        id="passwordUpdateForm"
        :validation-schema="schema"
        @submit="updatePassword"
        v-slot="{ meta }"
        class="is-centered"
      >
        <InputFieldWithValidations
          id="passwordUpdateEmail"
          name="password"
          :label="t('form.new_password')"
          :type="showPassword ? 'text' : 'password'"
          :placeholder="t('form.new_password')"
          :append-icon="showPassword ? 'far fa-eye-slash' : 'far fa-eye'"
          @click:append="showPassword = !showPassword"
        />

        <InputFieldWithValidations
          id="confirmPasswordUpdateEmail"
          name="password_confirmation"
          :label="t('form.password_confirm')"
          :type="showConfirmPassword ? 'text' : 'password'"
          :append-icon="showConfirmPassword ? 'far fa-eye-slash' : 'far fa-eye'"
          :placeholder="t('form.password_confirm')"
          @click:append="showConfirmPassword = !showConfirmPassword"
        />

        <v-btn
          color="primary"
          type="submit"
          class="is-full-width"
          id="passwordRecoverButton"
          :disabled="!meta.valid"
        >
          {{ t('authentication.update.confirm_password') }}
        </v-btn>
      </Form>
    </div>
    <loader v-if="isLoading"></loader>
  </Layout>
</template>

<style lang="scss" scoped>
.container {
  padding: 1rem;

  @media screen and (min-width: 480px) {
    width: 28rem;
  }

  .change-title {
    margin-bottom: 0.8em;
  }

  .is-full-width {
    width: 100%;
  }
}
</style>
