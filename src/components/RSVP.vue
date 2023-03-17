<script setup lang="ts">
import pb from '@/services/pb';
import useModal from '@/_store/modal';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { ref } from 'vue';
import * as yup from 'yup';
import RSVPModal from '@/components/rsvp/Modal.vue';

const isLoading = ref(false);
const modal = useModal();

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  name: yup.string().required(),
  message: yup.string().required(),
  attending: yup.string().required(),
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
  {
    label: 'Password',
    as: 'input',
    type: 'password',
    field: 'password',
  },
  {
    label: 'Will you come?',
    as: 'select',
    field: 'attending',
    value: 'Kemaman',
    options: [
      'Seremban',
      'Kemaman',
      'Kuantan',
      'Kemaman and Kuantan',
      'all',
      'Cannot come',
    ],
  },
];

const register = async (values: any, { resetForm }: any) => {
  isLoading.value = true;

  const { email, name, password, attending, message } = values;
  const data = {
    email: email,
    emailVisibility: true,
    password: password,
    passwordConfirm: password,
    attending: attending,
    name,
  };

  const createdUser = await pb.collection('users').create(data);
  await pb.collection('users').requestVerification(email);

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
    removeCancelButton: true,
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
              :value="field.value ?? ''"
              autocomplete="off"
            >
              <option v-if="field.options" value="" disabled>
                Select a Venue
              </option>
              <option
                v-if="field.options"
                v-for="option in field.options"
                :value="option"
              >
                {{ option }}
              </option>
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
