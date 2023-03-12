<script setup lang="ts">
import Toasts from '@/shared/components/Toast.vue';
import Modal from '@/shared/components/Modal.vue';
import { onBeforeMount, onBeforeUnmount, ref, onMounted } from 'vue';
import { useLoader } from './_store/loader';
import { useModal } from './_store/modal';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import {
  Hero,
  Gallery,
  Locations,
  Modal as InvitationModal,
  Quotes,
  RSVP,
  Support,
  Navbar,
} from '@/components';
import { useUser } from './_store/user';

const loader = useLoader();
const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const modal = useModal();
const user = useUser();

onBeforeMount(() => {
  window.addEventListener('resize', () => {
    loader.updateWindow(window.innerWidth);
  });
  user.checkUser();
});

onMounted(() => {
  modal.open({
    view: InvitationModal,
    outsideClick: false,
    removeCancelButton: true,
  });
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

    <Navbar />
    <v-main>
      <!-- Hero and count down -->
      <Hero />

      <!-- Quotes -->
      <Quotes />

      <!-- Gallery about our lives -->
      <Suspense>
        <Gallery />
        <template #fallback> hihi </template>
      </Suspense>

      <!-- Location -->
      <Locations />

      <!-- Form RESP -->
      <RSVP />

      <!-- Button to support with gift -->
    </v-main>
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
