<script lang="ts" setup>
import Layout from './Layout.vue';
import { Form } from 'vee-validate';
import * as yup from 'yup';
import InputFieldWithValidations from '@/shared/forms/InputFieldWithValidations.vue';
import Api from '@/services/auth.api';
import { useI18n } from 'vue-i18n';
import { ref, onMounted } from 'vue';
import { useToast } from '@/_store/toast';

// i18n
const { t } = useI18n();

// Toast
const toast = useToast();

// Validation rules
const schema = yup.object({
  email: yup.string().email().required(),
});

const isLoading = ref<boolean>(false);
const successMessage = ref<string>('');
const errorMessage = ref<string[]>([]);

// TODO - update the rest with a proper way
let emailField = null;
onMounted(() => {
  emailField = document.getElementById('passwordRecoveryEmail');
  document.addEventListener('change', () => {
    if (errorMessage.value.length > 0) {
      errorMessage.value = [];
    }
  });
});

const recover = (values: any) => {
  isLoading.value = true;

  Api.recoverPassword(values)
    .then(({ data }) => {
      successMessage.value = data.message;
      toast.append({ message: t('toast.request_sent') });
    })
    .catch((error) => {
      let { data } = error.response;

      if (!data?.errors) {
        errorMessage.value.push({ ...data });
      }

      if (data.errors.email) {
        errorMessage.value = data.errors.email;
      } else {
        errorMessage.value.push(data.errors);
      }
      // TODO - sentry logger
    })
    .finally(() => {
      isLoading.value = false;
    });
};
</script>

<template>
  <Layout>
    <div class="container">
      <div class="columns recover-title">
        <div class="column has-text-centered">
          <h1 class="subtitle">{{ t('authentication.recover.subtitle') }}</h1>
          <p>{{ t('authentication.recover.description') }}</p>
          <p>{{ t('authentication.recover.description2') }}</p>
        </div>
      </div>

      <Form
        id="recoverPasswordForm"
        :validation-schema="schema"
        @submit="recover"
        v-slot="{ meta }"
        class="is-centered"
      >
        <InputFieldWithValidations
          id="passwordRecoveryEmail"
          name="email"
          :label="t('form.email')"
          type="email"
          placeholder="johndoe@gmail.com"
          :error-messages="errorMessage"
        />

        <p class="help is-success" v-if="successMessage">
          {{ successMessage }}
        </p>

        <v-btn
          color="primary"
          type="submit"
          class="is-full-width"
          id="passwordRecoverButton"
          :disabled="!meta.valid"
        >
          {{ t('form.send_btn') }}
        </v-btn>
      </Form>
    </div>
    <loader v-if="isLoading"></loader>
  </Layout>
</template>

<style lang="scss" scoped>
h1.subtitle {
  font-size: 2em;
}
.container {
  padding: 1rem;
  max-width: 28rem;

  .column p {
    margin: 0;
    font-size: 0.875rem;
  }

  .is-full-width {
    width: 100%;
  }
}
</style>
