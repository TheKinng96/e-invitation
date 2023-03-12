<script setup lang="ts">
import Toasts from '@/shared/components/Toast.vue';
import Modal from '@/shared/components/Modal.vue';
import { onBeforeMount, onBeforeUnmount } from 'vue';
import { useLoader } from './_store/loader';
import { useUser } from './_store/user';

const loader = useLoader();
const user = useUser();

onBeforeMount(() => {
  window.addEventListener('resize', () => {
    loader.updateWindow(window.innerWidth);
  });
  user.checkUser();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', () => {
    loader.updateWindow(window.innerWidth);
  });
});
</script>

<template>
  <v-app>
    <Modal />
    <Toasts />

    <router-view />
  </v-app>
</template>

<style lang="scss">
@import '../node_modules/bulma/bulma.sass';
@import './assets/styles/style.scss';

.logo-container {
  display: grid;

  img {
    width: 7rem;
  }
}

.v-navigation-drawer__scrim {
  background: $color-neutral-200;
  opacity: 0.8;
}

#mobile-drawer {
  width: 305px !important;

  @media screen and (max-width: $sm-breakpoint-max) {
    z-index: 1006 !important;
    height: 100% !important;
    top: 0 !important;
  }
}

#app-bar {
  .v-toolbar__content {
    max-width: 60rem;
    margin: auto;

    @media screen and (min-width: $sm-breakpoint-min) {
      padding-left: 1rem;
    }

    @media screen and (max-width: $sm-breakpoint-max) {
      // To center the logo because of the burger
      padding-right: 64px;
    }
  }

  i {
    font-size: 1.35rem;
    color: $color-neutral-800;
  }
}

hr {
  margin: 0;
}
</style>
