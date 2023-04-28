<script lang="ts" setup>
import pb from '@/services/pb';
import useModal from '@/_store/modal';
import { useUser } from '@/_store/user';
import LoginModal from './LoginModal.vue';
import { computed } from 'vue';

const userStore = useUser();
const modal = useModal();

const getImage = computed(() => {
  if (userStore.getHasLogin && userStore.user.avatar) {
    return pb.getFileUrl(userStore.user, userStore.user.avatar);
  }

  return new URL(`@/assets/img/avatar.svg`, import.meta.url).href;
});

const openModal = () => {
  if (userStore.getHasLogin) {
    return;
  }

  modal.open({
    view: LoginModal,
    outsideClick: true,
    removeCancelButton: true,
  });
};
</script>

<template>
  <button @click="openModal()" class="user-widget">
    <div class="avatar-container">
      <v-avatar :image="getImage"></v-avatar>
    </div>
    <span v-if="userStore.user">{{ userStore.user.username }}</span>
    <span v-else>Guest</span>

    <div
      class="user-dropdown"
      :class="{ none: !userStore.user }"
      v-if="userStore.getHasLogin"
    >
      <button @click="userStore.logUserOut()">Logout</button>
    </div>
  </button>
</template>

<style scoped lang="scss">
button.user-widget {
  display: flex;
  align-items: center;
  padding: 0.25rem 1rem;
  transition: all linear 0.25s;
  position: relative;

  .user-dropdown {
    visibility: hidden;
    position: absolute;
    bottom: -50%;
    transition: 0.5s ease-in-out visibility;
    background-color: $color-white;
    left: 50%;
    transform: translateX(-50%);
    @include box-shadow-2;

    button {
      padding: 0.25rem 1.5rem;
    }

    &.none {
      display: none;
    }
  }

  .avatar-container {
    scale: 0.65;
    background-color: #e3e8f8;
    border: 4px solid #203562;
    border-radius: 50% !important;
    transition: all linear 0.25s;

    :deep(.v-img__img--contain) {
      object-fit: cover;
    }
  }

  &:hover {
    background-color: #e3e8f8;

    .avatar-container {
      border-radius: 4px !important;
    }

    .user-dropdown {
      visibility: visible;
    }
  }
}
</style>
