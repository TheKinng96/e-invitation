<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useLoader } from '@/_store/loader';

const loader = useLoader();
const route = useRoute();
const { t } = useI18n();
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
</template>

<style lang="scss" scoped></style>
