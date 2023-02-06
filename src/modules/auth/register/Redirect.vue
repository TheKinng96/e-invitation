<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useUser } from '@/_store/user';
import { Token } from '@/_types/auth.types';
import { useRoute, useRouter } from 'vue-router';
import Api from '@/services/registration.api';
import { setLanguage } from '@/services/localstorage';
import jwt_decode from 'jwt-decode';
import { useI18n } from 'vue-i18n';
import { useToast } from '@/_store/toast';
import { ToastType } from '@/_store/toast/types';
import { UserStatus } from '@/_types/user.type';

const user = useUser();
const toast = useToast();

const token = ref<Token>({ token: null });

const router = useRouter();
const route = useRoute();

const { t } = useI18n();

const emit = defineEmits<{
  (e: 'stepChange', step: number): void;
}>();

const registerConfirmToken = () => {
  Api.registerConfirmToken(token.value)
    .then((response) => {
      let { mail_resent, message, token_data } = response.data;

      if (mail_resent) {
        toast.append({
          message: message,
        });
        router.push({ name: 'login' });
      } else if (token_data) {
        let decodedToken = jwt_decode(token.value.token as string) as any;
        let { language, user_type, token: bearerToken, status } = token_data;

        // if there is a logged in user, log out that user first.
        if (localStorage.getItem('jwt')) {
          user.logUserOut();
        }

        if (decodedToken) user.updateEmail(decodedToken.email);
        setLanguage(language);
        user.setUserType(user_type);
        user.authorizeUser(bearerToken);
        user.updateUserStatus(UserStatus.NOT_VERIFIED);
        checkRedirect(status);
      }
    })
    .catch((error: any) => {
      toast.append({
        message: error.response.data.message,
        type: ToastType.danger,
        isSnackbar: true,
      });
      router.push({ name: 'registration' });

      // messageGenerator(error, 'registerConfirmToken');
    });
};

onMounted(() => {
  let lang = import.meta.env.VUE_APP_I18N_LOCALE || 'jp';
  if (route.query.language && route.query.language.length > 0) {
    lang = route.query.language.toString();
  }
  // i18n.locale = lang;

  emit('stepChange', 0);
  token.value.token = route.query.token as string;
  if (token.value.token) {
    registerConfirmToken();
  } else {
    toast.append({ message: t('registration.redirect.token_not_found') });

    router.push({ path: '/register' });
  }
});

const checkRedirect = (status: string) => {
  if (status === 'completed') {
    toast.append({
      message: t('registration.redirect.registration_already_completed'),
    });

    router.push({ path: '/dashboard' });
  } else {
    toast.append({
      message: t('registration.redirect.continue_registration'),
    });
    router.push({
      name: user.isColormeAppStoreUser
        ? 'colormeRegisterBasicInfo'
        : 'registerBasicInfo',
    });
  }
};
</script>

<template>
  <div class="redirect columns is-centered">
    <div class="column is-half has-text-centered is-size-1">
      <div>
        <p>{{ t('registration.redirect.please_wait') }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.redirect {
  margin-top: 2em;
  margin-bottom: 2em;
}
.button {
  margin-top: 1em;
}
</style>
