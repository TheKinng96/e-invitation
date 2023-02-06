<script setup lang="ts">
import { ref, onMounted } from 'vue';
import loginLinkApi from '@/services/api';
import { useUser } from '@/_store/user';
import { useLoader } from '@/_store/loader';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const emit = defineEmits<{
  (e: 'stepChange', step: number): void;
}>();

const { t } = useI18n();

const user = useUser();
const loader = useLoader();

const router = useRouter();

const jwtToken: string | null = localStorage.getItem('jwt');
const modifiedJwtToken = ref();

onMounted(() => emit('stepChange', user.isColormeAppStoreUser ? 3 : 5));

const goToDashboard = () => {
  user.authenticateUser();

  //   loader.updateLoader();
  if (jwtToken) {
    modifiedJwtToken.value = jwtToken.replace(/['"]+/g, '');
  }

  loginLinkApi()
    .post(`/user/auth/login/token/${modifiedJwtToken.value}`)
    .then((response) => {
      user.logUserIn(response.data);
      router.push({ name: 'dashboard' });
    })
    .catch((error) => {
      //   messageGenerator(error, 'loginLinkApi');
    })
    .finally(() => {
      // this.updateLoader();
    });
};
</script>

<template>
  <div class="container">
    <div class="finish-icon">
      <i class="far fa-check-circle"></i>
    </div>
    <div class="title">
      {{ t('registration.content.finish_title') }}
    </div>

    <hr />
    <div
      class="content-message"
      v-html="t('registration.content.finish_message')"
    ></div>
    <v-btn
      color="primary"
      id="goToDashboard"
      class="button is-block is-info is-medium is-centered"
      :class="{ 'is-loading': user.getWallLoader }"
      @click.prevent="goToDashboard"
    >
      {{ t('form.go_to_dashboard_btn') }}
      <span class="arrow-icon">
        <i class="fas fa-arrow-right"></i>
      </span>
    </v-btn>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 2rem;
}
.finish-icon {
  color: $color-primary-300;
  font-size: 8rem;
  font-weight: 500;
  text-align: center;
  margin-bottom: 1.75rem;
}

hr {
  margin: 1rem 2.5rem;
}

#goToDashboard {
  margin-top: 1em;
  margin: 0 auto;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  padding: 1rem 0.75rem;
  height: auto;
  width: 100%;

  @media screen and (min-width: $sm-breakpoint-min) {
    max-width: 250px;
  }
}

.title {
  font-size: 2rem;
  color: $color-neutral-800;
  text-align: left;

  @media screen and (min-width: $sm-breakpoint-min) {
    font-size: 2rem;
    text-align: center;
  }
}

.content-message {
  font-size: 1rem;
  margin-bottom: 2.5rem;
  font-weight: 500;
  color: $color-neutral-600;
  text-align: left;

  @media screen and (min-width: $sm-breakpoint-min) {
    font-size: 1.25rem;
    text-align: center;
  }
}
.arrow-icon {
  margin-left: 0.25rem;
}

@media screen and (min-width: 769px) {
  hr {
    margin: 2.5rem 10rem;
  }
}
</style>
