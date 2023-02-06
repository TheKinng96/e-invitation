<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useLoader } from '@/_store/loader';
import { useUser } from '@/_store/user';
import { StepperI } from '@/_types/stepper/stepper.type';
import { useRouter, useRoute } from 'vue-router';
import Stepper from '@/components/Stepper.vue';

const { t } = useI18n();

const step = ref(0);
const steps = ref<StepperI[]>([]);

const router = useRouter();
const route = useRoute();

const user = useUser();
const loader = useLoader();

const IEWarningIsActive = ref(true);
const affiliateTag = ref('');
const logo = ref('');
const companyName = ref('AdSIST');
// There is a display gap between brand image updating, delaying the whole page until it fully loaded
const showPage = ref(false);

const onStepChange = (st: number) => {
  step.value = st;
};

const turnShowPage = (prop: boolean) => {
  showPage.value = prop;
};

const getWarningText = (): string => {
  let text = '';

  if (step.value === 0) {
    text = t('registration.content.extra_information').toString();
  } else if (step.value === 4) {
    text = t('registration.content.extra_information_card').toString();
  }

  return text;
};

onMounted(() => {
  showPage.value = true;
  steps.value = [
    {
      id: 1,
      description: t('registration.content.basic_info').toString(),
    },
    ...(user.isColormeAppStoreUser
      ? []
      : [
          {
            id: 2,
            description: t('registration.content.select_plan').toString(),
          },
        ]),
    {
      id: user.isColormeAppStoreUser ? 2 : 3,
      description: t('registration.content.confirm_input').toString(),
    },
    ...(user.isColormeAppStoreUser
      ? []
      : [
          {
            id: 4,
            description: t('registration.content.payment').toString(),
          },
        ]),
    {
      id: user.isColormeAppStoreUser ? 3 : 5,
      description: t('registration.content.finish').toString(),
    },
  ];
});

onBeforeMount(() => {
  showPage.value = false;
  if (route.query.affiliate) {
    affiliateTag.value = route.query.affiliate as string;
    loader.getSpecificLogoFromApi(affiliateTag.value);
  } else {
    /**
     * Todo - check why left same keys here
     * Error - duplicate or covered by previous conditions in the if-else-if chain
     */
    affiliateTag.value = '';
  }
});

const getImgUrl = () => {
  let image;
  if (router.currentRoute.value.path === '/register/step/one') {
    // ShowPage will come from child component by eventbus
    if (loader.getAffiliateUser && loader.getAffiliateUser.skin_feature) {
      image = loader.getAffiliateUser.logo?.normal_img_path;
    } else {
      image = new URL(`@/assets/img/logo.svg`, import.meta.url).href;
    }
  } else if (affiliateTag.value || loader.getAffiliateUser) {
    if (loader.getAffiliateUser?.skin_feature) {
      image = loader.getAffiliateUser.logo?.normal_img_path;
      companyName.value = loader.getAffiliateUser.name;
      showPage.value = true;
    } else {
      if (!loader.getAffiliateUser) {
        let query = Object.assign({}, route.query);
        delete query.affiliate;
        router.replace({ query });
      }
      image = new URL(`@/assets/img/logo.svg`, import.meta.url).href;
      showPage.value = true;
    }
  } else {
    image = new URL(`@/assets/img/logo.svg`, import.meta.url).href;
    showPage.value = true;
  }

  return image;
};
</script>

<template>
  <div class="registration-form" v-show="showPage">
    <div v-if="step === 0">
      <div class="registration-page-title text-cente mb-4">
        <div class="registration-header-container">
          <div>
            <img :src="getImgUrl()" class="login-logo" />
          </div>
          <h1 class="is-size-4 has-text-weight-bold">
            {{ t('registration.page.title_line_one')
            }}<br class="is-hidden-tablet" />{{
              t('registration.page.title_line_two')
            }}
          </h1>
        </div>
        <h6 class="is-size-6 has-text-grey">REGISTER</h6>
      </div>
    </div>
    <div v-show="showPage">
      <div v-if="step > 0">
        <div class="registration-page-title has-text-centered mb-4">
          <div class="registration-header-container">
            <div>
              <img :src="getImgUrl()" class="login-logo" />
            </div>
            <h3 class="is-size-4 has-text-weight-bold">
              {{ t('registration.page.title_line_one')
              }}<br class="is-hidden-tablet" />{{
                t('registration.page.title_line_three')
              }}
            </h3>
          </div>
          <h6 class="is-size-6 has-text-grey">REGISTER</h6>
        </div>
      </div>
      <Stepper v-if="step > 0" :activeStep="step" :steps="steps"></Stepper>
      <div :class="{ 'registration-box': step === 0, 'last-step': step === 5 }">
        <router-view
          @stepChange="onStepChange"
          @showPage="turnShowPage"
        ></router-view>
        <div
          class="mb-3"
          v-if="step !== 5"
          :class="[step === 4 ? 'has-text-secondary' : 'has-text-primary']"
        >
          <div v-html="getWarningText()"></div>
          <br />
          <small>
            ※{{ t('registration.content.extra_information_two') }}
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#login {
  color: var(--theme-primary);
}

.has-text-secondary {
  color: var(--theme-secondary);
}

.registration-header-container {
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 7.5rem;
    margin-top: 0.5rem;
    margin-right: 0.5rem;
  }
}

.registration-box {
  display: flex;
  flex-direction: column-reverse;
}

.registration-form {
  margin: 2rem auto 4rem;
  width: 100%;
  max-width: 960px;

  .box {
    padding: 1.75rem;
  }
}

@media screen and (min-width: 769px) {
  .registration-form {
    padding: 0 1.5rem;

    margin: 3rem auto;
    .box {
      padding: 2.5rem 3rem;
    }
  }

  .registration-page-title {
    margin-bottom: 2rem !important;

    h1 {
      font-size: 2rem;
    }
  }

  .last-step {
    max-width: 960px;
    margin: auto;
  }
}

@media screen and (min-width: 600px) {
  .registration-box {
    flex-direction: column;

    :nth-child(2) {
      margin-bottom: 0;
    }
  }
}

@media screen and (max-width: 768px) {
  .registration-header-container {
    flex-direction: column;
  }
}
</style>
