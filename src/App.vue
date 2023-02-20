<script setup lang="ts">
import Toasts from '@/shared/components/Toast.vue';
import Modal from '@/shared/components/Modal.vue';
import { onBeforeMount, onBeforeUnmount, ref, onMounted } from 'vue';
import { useLoader } from './_store/loader';
import { useModal } from './_store/modal';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import InvitationModal from '@/components/Modal.vue';
import Hero from '@/components/Hero.vue';

const loader = useLoader();
const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const modal = useModal();

onBeforeMount(() => {
  window.addEventListener('resize', () => {
    loader.updateWindow(window.innerWidth);
  });
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

const openDrawer = ref(false);
const imgUrl = new URL('@/assets/img/logo.svg', import.meta.url).href;

const appItems = [
  {
    title: t('page_title.dashboard'),
    value: 'dashboard',
    icon: 'home-02',
  },
  {
    title: t('page_title.campaigns'),
    value: 'campaigns',
    icon: 'currency-yen-circle',
  },
  {
    title: t('page_title.insights'),
    value: 'insights',
    icon: 'bar-chart-12',
  },
  {
    title: t('page_title.google_analytics'),
    value: 'google-analytics',
    icon: 'line-chart-up-02',
    isNew: true,
  },
];

const isCurrentPage = (currentRoute: string): boolean => {
  return route.path.includes(currentRoute);
};
</script>

<template>
  <v-app>
    <Modal />
    <Toasts />
    <v-app-bar id="app-bar">
      <v-app-bar-nav-icon
        @click="openDrawer = !openDrawer"
        v-if="loader.isMobile"
      />
      <v-spacer v-if="loader.isMobile" />
      <router-link to="/dashboard" class="logo-container">
        <img :src="imgUrl" class="login-logo" />
      </router-link>
      <v-spacer />
    </v-app-bar>

    <v-navigation-drawer
      v-model="openDrawer"
      absolute
      id="adsist-mobile-drawer"
      v-if="loader.isMobile"
    >
      <v-list>
        <v-list-item
          v-for="item in appItems"
          :key="item.value"
          :class="{ active: isCurrentPage(item.value) }"
        >
          <router-link :to="`#${item.value}`">
            <v-btn variant="text" class="list-item">
              <Icon
                :icon="item.icon"
                src="dashboard"
                :type="isCurrentPage(item.value) ? 'primary' : 'grey'"
              />
              <v-spacer />
              {{ item.title }}
            </v-btn>
          </router-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <!-- Hero and count down -->
      <Hero />
      <!-- Quotes -->

      <!-- Gallery about our lives -->
      <!-- Location -->
      <!-- Form RESP -->
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
