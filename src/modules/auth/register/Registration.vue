<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Form, useForm } from 'vee-validate';
import * as yup from 'yup';
import InputFieldWithValidations from '@/shared/forms/InputFieldWithValidations.vue';
import { useI18n } from 'vue-i18n';
import Api from '@/services/registration.api';
import { useRoute } from 'vue-router';
import { getLanguage } from '@/services/localstorage';
import {
  ValidationErrors,
  RegistrationErrors,
} from '@/_types/validationErrors.type';
import { useToast } from '@/_store/toast';
import { ToastType } from '@/_store/toast/types';
import { IRegistrationParam } from '@/_types/auth.types';
import router from '@/router';

// i18n
const { t } = useI18n();

// Validation rules
const schema = yup.object({
  first_name: yup.string().required().max(100),
  last_name: yup.string().required().max(100),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      t('validation.password_policy').toString(),
    ),
  password_confirmation: yup
    .string()
    .required()
    .oneOf(
      [yup.ref('password'), null],
      t('validation.error.passwords_must_match'),
    ),
});

const { isSubmitting, handleSubmit, meta } = useForm({
  validationSchema: schema,
});

// Router
const route = useRoute();

// Toast
const toast = useToast();

const affiliateTag = ref('');
const isLoading = ref(false);

onMounted(() => {
  if (route.query.affiliate) {
    affiliateTag.value = route.query.affiliate as string;
  }
});

const register = handleSubmit((values: any, { resetForm }: any) => {
  isLoading.value = true;

  let params: IRegistrationParam = {
    ...values,
    affiliate: affiliateTag.value,
    language: getLanguage(),
  };

  Api.registerRequest(params)
    .then(async () => {
      isLoading.value = false;

      router.push({ name: 'registrationEmailSent' });

      // Reset the form
      resetForm();
    })
    .catch((err) => {
      err = err.response as ValidationErrors<RegistrationErrors>;
      toast.append({
        message: err.data.message,
        type: ToastType.danger,
        isSnackbar: true,
      });
      // TODO - sentry
    })
    .finally(() => {
      isLoading.value = false;
    });
});
</script>

<template>
  <form @submit="register">
    <div class="form-grid">
      <InputFieldWithValidations
        id="lastNameInput"
        name="last_name"
        :label="t('form.last_name')"
        type="text"
        :placeholder="t('form.last_name')"
        class="form-item"
        :hasNoLabel="true"
      />

      <InputFieldWithValidations
        id="firstNameInput"
        name="first_name"
        :label="t('form.first_name')"
        type="text"
        :placeholder="t('form.first_name')"
        :hasNoLabel="true"
        class="form-item"
      />

      <InputFieldWithValidations
        id="emailInput"
        name="email"
        :label="t('form.email')"
        type="email"
        :placeholder="t('form.email')"
        :hasNoLabel="true"
        class="form-item"
      />

      <InputFieldWithValidations
        id="passwordInput"
        name="password"
        :label="t('form.password')"
        :isPasswordField="true"
        :hasNoLabel="true"
        class="form-item"
      />

      <InputFieldWithValidations
        id="passwordConfirmInput"
        name="password_confirmation"
        :label="t('form.confirm_password')"
        :isPasswordField="true"
        :hasNoLabel="true"
        class="form-item"
      />
    </div>

    <v-btn
      color="primary"
      type="submit"
      class="submit-button"
      :loading="isLoading"
      :disabled="!meta.valid || isSubmitting"
    >
      {{ t(`authentication.form_button_${route.meta?.title}`) }}
    </v-btn>
  </form>
</template>

<style lang="scss" scoped>
form {
  .form-grid {
    display: flex;
    flex-wrap: wrap;

    .form-item {
      flex-basis: 100%;
    }
  }

  .submit-button {
    width: 100%;
  }
}

@media screen and (min-width: 920px) {
  form {
    .form-grid {
      .form-item {
        &:first-child,
        &:nth-child(2) {
          flex-basis: 48%;
        }

        &:first-child {
          margin-right: 0.5rem;
        }
      }
    }
  }
}
</style>
