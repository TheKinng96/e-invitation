<script setup lang="ts">
import pb from '@/services/pb';
import useModal from '@/_store/modal';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { ref } from 'vue';
import * as yup from 'yup';
import RSVPModal from '@/components/rsvp/Modal.vue';
import { useToast } from '@/_store/toast';
import { ToastType } from '@/_store/toast/types';

const isLoading = ref(false);
const modal = useModal();
const toast = useToast();

const schema = yup.object({
  email: yup.string().email().required(),
  name: yup.string().required(),
  message: yup.string().required(),
});

const fields = [
  {
    label: 'Message',
    as: 'textarea',
    type: 'text',
    field: 'message',
  },
  {
    label: 'Name',
    as: 'input',
    type: 'text',
    field: 'name',
  },
  {
    label: 'Email',
    as: 'input',
    type: 'email',
    field: 'email',
  },
];

const register = async (values: any, { resetForm }: any) => {
  isLoading.value = true;

  const { email, name, message } = values;
  // Generate a strong password of 8 characters
  const password = Math.random().toString(36).slice(-8);

  const data = {
    email: email,
    emailVisibility: true,
    password: password,
    passwordConfirm: password,
    name,
  };

  const createdUser = await pb.collection('users').create(data);

  try {
    await pb.collection('users').requestVerification(email);
  } catch ({ message }: any) {
    toast.append({
      message: message ? (message as string) : 'Something went wrong',
      type: ToastType.danger,
    });
  }

  const messageData = {
    user: createdUser.id,
    text: message,
  };

  await pb.collection('messages').create(messageData);
  isLoading.value = false;
  resetForm();

  modal.open({
    view: RSVPModal,
    outsideClick: true,
    removeCancelButton: false,
  });
};
</script>

<template>
  <div class="wrapper">
    <v-container>
      <h2>Leave us a Message</h2>
      <div class="form-container">
        <Form :validation-schema="schema" @submit="register" v-slot="{ meta }">
          <div
            class="validation-field"
            v-for="field in fields"
            :key="field.field"
          >
            <label :for="field.field">{{ field.label }}</label>
            <Field
              :as="field.as"
              :type="field.type ?? ''"
              :name="field.field"
              class="field"
              autocomplete="off"
            >
            </Field>
            <ErrorMessage :name="field.field" class="error-message" />
          </div>

          <div class="button-wrapper">
            <v-btn
              class="button-m primary-btn"
              type="submit"
              :disabled="!meta.valid || isLoading"
              :loading="isLoading"
            >
              Submit
            </v-btn>
          </div>
        </Form>
      </div>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  background-color: #e3e8f8;
  padding-bottom: 2rem;
}

.validation-field {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;

  > .field {
    border: $color-primary-800 1px solid;
    padding: 0.5rem 1rem;
    border-radius: 4px;
  }
}

.error-message {
  color: $color-accent-500;
}

.form-container {
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: $color-white;
  margin-top: 1rem;
}

.button-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-end;

  button {
    margin-left: auto;
    padding-left: 2.5rem;
    padding-right: 2.5rem;
    max-width: 10rem;
  }
}
</style>
