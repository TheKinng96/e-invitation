<script lang="ts" setup>
import useModal from '@/_store/modal';
import { useI18n } from 'vue-i18n';
import { ref, shallowRef } from 'vue';
import LoginForm from './LoginModal/LoginForm.vue';
import ResetPassword from './LoginModal/ResetPassword.vue';
import ResendVerification from './LoginModal/ResendVerificationForm.vue';
import { onMounted } from 'vue';

type ComponentName = 'LoginForm' | 'ResetPassword' | 'ResendVerification';

const { t } = useI18n();
const modal = useModal();
const currentComponent = shallowRef();

const scrollToRegister = () => {
  const rsvp = document.getElementById('rsvp');

  modal.close();
  if (rsvp) {
    rsvp.scrollIntoView({ behavior: 'smooth' });
  }
};

onMounted(() => {
  getCurrentComponent('LoginForm');
});

// Get the correct component to display
const getCurrentComponent = (modalName: ComponentName) => {
  // Switch case for the different components and set current component to the correct one
  switch (modalName) {
    case 'LoginForm':
      currentComponent.value = LoginForm;
      break;
    case 'ResetPassword':
      currentComponent.value = ResetPassword;
      break;
    case 'ResendVerification':
      currentComponent.value = ResendVerification;
      break;
    default:
      currentComponent.value = LoginForm;
      break;
  }
};
</script>

<template>
  <div class="login-modal-content">
    <h6>Welcome Back!</h6>

    <component
      :is="currentComponent"
      :scrollToRegister="scrollToRegister"
      @updateComponent="getCurrentComponent"
    />
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
