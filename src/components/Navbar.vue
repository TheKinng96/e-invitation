<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useLoader } from '@/_store/loader';
import { useUser } from '@/_store/user';
import UserWidget from '@/components/navbar/UserWidget.vue';

const user = useUser();
const loader = useLoader();
const route = useRoute();
const { t } = useI18n();
const openDrawer = ref(false);
const imgUrl = new URL('@/assets/img/logo.svg', import.meta.url).href;

const appItems = [
  {
    title: t('page_title.dashboard'),
    value: 'Gallery',
    icon: 'home-02',
  },
];

const isCurrentPage = (currentRoute: string): boolean => {
  return route.path.includes(currentRoute);
};

const dotIcon = new URL(`@/assets/img/dots-vertical.svg`, import.meta.url).href;
</script>

<template>
  <v-app-bar id="app-bar">
    <v-app-bar-nav-icon
      @click="openDrawer = !openDrawer"
      v-if="loader.isMobile"
    >
      <img :src="dotIcon" alt="nav icon" />
    </v-app-bar-nav-icon>
    <v-spacer v-if="loader.isMobile" />
    <router-link to="/" class="logo-container">
      <img :src="imgUrl" class="login-logo" />
    </router-link>
    <v-spacer />
    <UserWidget v-if="!loader.isMobile" />
  </v-app-bar>

  <v-navigation-drawer
    v-model="openDrawer"
    absolute
    id="adsist-mobile-drawer"
    v-if="loader.isMobile"
  >
    <v-list>
      <v-list-item>
        <UserWidget :isList="true" class="list-avatar" />
      </v-list-item>

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
</template>

<style lang="scss" scoped>
#app-bar {
  @media screen and (min-width: $sm-breakpoint-min) {
    overflow: visible;
  }
}

.login {
  pointer-events: none;
}

.list-avatar {
  width: 100%;
}
</style>
