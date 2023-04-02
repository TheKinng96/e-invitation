<script lang="ts" setup>
import useModal from '@/_store/modal';

const modal = useModal();

const close = () => {
  modal.setClosingAnimation();
  setTimeout(() => {
    modal.close();
  }, 500);
};
</script>

<template>
  <h6 class="mb-5">A Confirmation Email has been sent!</h6>
  <p>Please check your mailbox and verify your email.</p>
  <p>After verified, you will be able to upload image and edit your message.</p>
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

  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
}
</style>
