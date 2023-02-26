<script lang="ts" setup>
import useModal from '@/_store/modal';
import { useUser } from '@/_store/user';
import LoginModal from './LoginModal.vue';

const user = useUser();
const modal = useModal();

const getImage = () => {
  if (user.isValid) {
    return user.avatar;
  }

  return new URL(`@/assets/img/avatar.svg`, import.meta.url).href;
};

const openModal = () => {
  modal.open({
    view: LoginModal,
    outsideClick: true,
    removeCancelButton: true,
  });
};
</script>

<template>
  <button :class="{ login: user.isValid }" @click="openModal()">
    <div>
      <v-avatar :image="getImage()"></v-avatar>
    </div>
    <span v-if="user.isValid">{{ user.user.username }}</span>
    <span v-else>Guest</span>
  </button>
</template>

<style scoped lang="scss">
button {
  display: flex;
  align-items: center;
  padding: 0.25rem 1rem;
  transition: all linear 0.25s;

  > div {
    scale: 0.65;
    background-color: #e3e8f8;
    border: 4px solid #203562;
    border-radius: 50% !important;
    transition: all linear 0.25s;
  }

  &:hover {
    background-color: #e3e8f8;

    > div {
      border-radius: 4px !important;
    }
  }
}

.login {
  pointer-events: none;
}
</style>
