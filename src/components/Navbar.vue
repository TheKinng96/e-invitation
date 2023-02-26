<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useLoader } from '@/_store/loader';
import { useUser } from '@/_store/user';
import { load } from 'webfontloader';

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

const getImage = () => {
  if (user.isValid) {
    return user.avatar;
  }

  return new URL(`@/assets/img/avatar.svg`, import.meta.url).href;
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
    <router-link to="/dashboard" class="logo-container">
      <img :src="imgUrl" class="login-logo" />
    </router-link>
    <v-spacer />
    <div class="widget" v-if="!loader.isMobile">
      <button :class="{ login: user.isValid }">
        <v-avatar :image="getImage()"></v-avatar>
      </button>
      <span v-if="user.isValid">{{ user.user.username }}</span>
    </div>
  </v-app-bar>

  <v-navigation-drawer
    v-model="openDrawer"
    absolute
    id="adsist-mobile-drawer"
    v-if="loader.isMobile"
  >
    <v-list>
      <v-list-item>
        <button :class="{ login: user.isValid }" class="list-avatar">
          <v-avatar :image="getImage()"></v-avatar>
        </button>
        <span v-if="user.isValid">{{ user.user.username }}</span>
        <span v-else>Guest</span>
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
.login {
  pointer-events: none;
}

.list-avatar {
  scale: 0.65;
  background-color: #e3e8f8;
  border: 4px solid #203562;
  border-radius: 50% !important;
  transition: all linear 0.25s;

  &:hover {
    border-radius: 4px !important;
  }
}

.widget {
  display: flex;
  align-items: center;

  > button {
    scale: 0.65;
    background-color: #e3e8f8;
    border: 4px solid #203562;
    border-radius: 50% !important;
    transition: all linear 0.25s;

    &:hover {
      border-radius: 4px !important;
    }
  }

  span button {
    width: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 0;

    &:hover {
      background-color: #e3e8f8;
    }
  }
}
</style>
