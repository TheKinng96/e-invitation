<script setup lang="ts">
import Plan from '@/shared/forms/Plan.vue';
import Api from '@/services/registration.api';
import { useLoader } from '@/_store/loader';
import { PlanDetails } from '@/_store/registration/types';
import { useUser } from '@/_store/user';
import { ref, onBeforeMount, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { PlanType } from '@/_types/shared.types';
import Loader from '../components/Loader.vue';
import { Carousel, Pagination, Slide } from 'vue3-carousel';

import 'vue3-carousel/dist/carousel.css';

const props = withDefaults(
  defineProps<{
    isRegistration?: boolean;
    callback: (...args: any[]) => any;
  }>(),
  {
    isRegistration: true,
  },
);

const emit = defineEmits<{
  (e: 'stepChange', step: number): void;
  (e: 'error', message: string): void;
}>();

const carouselSettings = ref({
  itemsToShow: 1.11,
  snapAlign: 'center',
});

// breakpoints are mobile first
const carouselBreakpoints = ref({
  // 600px and up
  600: {
    itemsToShow: 1.5,
    snapAlign: 'center',
  },

  // 650px and up
  650: {
    itemsToShow: 2,
    snapAlign: 'center',
  },

  // 850px and up
  850: {
    itemsToShow: 2.5,
    snapAlign: 'center',
  },

  // 1030px and up show full
  1030: {
    itemsToShow: 3,
    snapAlign: 'start',
  },
});

const { t } = useI18n();

const loader = useLoader();
const user = useUser();

const plans = ref<PlanType[]>();
const sendingForm = ref(false);
const loadingInfo = ref(true);
const adsistPlusPlanId = ref('');
const messageNumbers = ref(3);
const isShopify = ref(false); // currency needs to be in dollars
const defaultPlans: string[] = [
  'フリープラン',
  'スタンダードプラン',
  'プレミアムプラン',
];

onBeforeMount(() => getPlans());

const getReminderClasses = computed(() => {
  let classes: string[] = [];

  if (loader.isMobile) {
    classes.push('has-text-left');
  } else {
    classes.push('has-text-centered');
  }

  return classes;
});

const getColumnsClasses = computed(() => {
  {
    let extraClasses: string[] = [];

    // Only when it is during registration and have at least 3 plans
    if (props.isRegistration && plans.value && plans.value.length > 2) {
      extraClasses.push('is-registration');
    }

    return extraClasses;
  }
});

onMounted(() => {
  if (user.getPlatform.length > 0) {
    if (
      (user.getUser.shop &&
        user.getUser.shop.platform_id.toLowerCase() === 'shopify') ||
      user.getPlatform.toLowerCase() === 'shopify'
    ) {
      isShopify.value = true;
    }
  } else {
    // if platform is undefined, get user shop
    getUserShop();
  }

  if (showSpecialPlans.value) {
    messageNumbers.value = 3;
  }
});

const showSpecialPlans = computed(() => {
  {
    return (
      (user.getUser.affiliate_user &&
        user.getUser.affiliate_user.use_special_plans) ||
      (loader.getAffiliateUser && loader.getAffiliateUser.use_special_plans)
    );
  }
});

const getUserShop = () => {
  loadingInfo.value = true;
  return Api.getUserShop()
    .then((response) => {
      if (response && response.data.platform_id.toLowerCase() === 'shopify') {
        isShopify.value = true;
      }
    })
    .catch((error) => {
      // messageGenerator(error, 'getUserShop');
    })
    .finally(() => {
      loadingInfo.value = false;
    });
};

const getPlans = () => {
  loadingInfo.value = true;
  Api.getPlans()
    .then((response) => {
      if (response) {
        const plansData = response.data;
        plans.value = plansData;

        adsistPlusPlanId.value = plansData.find(
          (plan: any) => plan.plan_type === 'adsist_plus',
        )._id;

        if (
          (user.getUser.current_plan_id &&
            user.getUser.current_plan_id === adsistPlusPlanId.value) ||
          (user.getUser.plan_id &&
            user.getUser.plan_id === user.adsistPlusPlanId)
        ) {
          // Only show plus plan if that user has linked with plus
          plans.value = plansData.filter(
            (plan: any) => plan.plan_type === 'adsist_plus',
          );
        } else {
          if (showSpecialPlans.value || isShopify.value) {
            plans.value = plansData.filter(
              (plan: any) => plan.plan_type !== 'adsist_plus',
            );
          } else {
            // Only show default three plans
            plans.value = plansData.filter((plan: any) =>
              defaultPlans.includes(plan.name),
            );
          }
        }
      }
    })
    .catch((error) => {
      emit('error', error.message);
      // messageGenerator(error, 'getPlans');
    })
    .finally(() => {
      loadingInfo.value = false;
    });
};

const selectPlan = (plan: any) => {
  sendingForm.value = true;
  plan.loading = true;
  let planDetails = {
    plan_id: plan._id,
  } as PlanDetails;

  Api.sendStepThree(planDetails)
    .then((response) => {
      if (response) {
        const isPlanPending = response.data?.plan_pending
          ? response.data.plan_pending
          : false;

        if (response.data.shopify_approval) {
          let localCallback = {
            callback_url: response.data.callback_url,
            callback_method: response.data.callback_method,
            redirect_url: response.data.redirect_url,
            return_parameter: response.data.return_parameter,
          };

          window.localStorage.setItem(
            'localCallback',
            JSON.stringify(localCallback),
          );

          window.location.href = response.data.url;
        } else {
          props.isRegistration ? '' : user.updatePlan(plan._id);
          return props.callback(true, plan, isPlanPending);
        }
      }
    })
    .catch((error) => {
      emit('error', error.message);
      //   messageGenerator(error, 'sendStepThree');
      return props.callback(false, plan);
    })
    .finally(() => {
      plan.loading = false;
      sendingForm.value = false;
    });
};
</script>

<template>
  <div class="plans-container">
    <div class="local-loading-wrapper" v-if="loadingInfo">
      <Loader :show="loadingInfo" />
    </div>

    <transition name="fade">
      <div v-if="!loadingInfo">
        <div
          v-if="user.getUser.plan_id === adsistPlusPlanId"
          class="notification is-yellow is-light"
        >
          {{ t('plan.linked_to_AdSIST_plus') }}
        </div>
        <div
          v-else-if="user.getUser.current_plan_id === adsistPlusPlanId"
          class="notification is-yellow is-light"
        >
          {{ t('plan.unlinked_to_AdSIST_plus') }}
        </div>
        <Carousel
          :settings="carouselSettings"
          :breakpoints="carouselBreakpoints"
        >
          <Slide
            v-for="(plan, index) in plans"
            class="style-adjustment"
            :key="plan._id"
          >
            <Plan
              :plan="plan"
              :isShopify="isShopify"
              :isRegistration="isRegistration"
              :plusPlanId="adsistPlusPlanId"
              :sendingForm="sendingForm"
              @selectedPlan="selectPlan"
              class="mb-2 mr-6"
            />
          </Slide>

          <template #addons="{ slidesCount }">
            <Pagination />
          </template>
        </Carousel>

        <div
          v-if="isShopify"
          class="shopify-notice has-text-centered has-text-primary"
        >
          <p>{{ t('plan.jump_to_shopify_subscription') }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.plans-container {
  overflow: scroll;
}

// Carousel styles
:deep(.carousel__pagination-button::after) {
  display: block;
  content: '';
  width: 5px;
  height: 5px;
  border-radius: 999px;
}

:deep(.carousel__pagination) {
  @media screen and (min-width: 900px) {
    display: none;
  }
}

:deep(.carousel__viewport) {
  overflow: scroll;
}

// Plan List
.columns {
  min-height: 15rem;
  position: relative;
  white-space: pre-line;
  justify-content: center;
}

.notice {
  font-size: 0.8rem;
  text-align: center;
  padding: 1rem 0;
}

.shopify-notice {
  font-size: 0.8rem;
  text-align: center;
}

.local-loading-wrapper {
  position: relative;
  min-height: 20em;
}

// Animations
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

// Animations
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media screen and (min-width: 769px) {
  .columns.is-registration {
    > :v-deep(div) {
      font-size: 0.65rem;

      .card {
        .card-content {
          padding-top: 0;
          padding-bottom: 0;

          p:first-child span span {
            font-size: 0.8em;
            font-weight: normal;
          }
        }

        footer.card-footer button {
          width: 100%;
        }
      }

      .card {
        header.card-header {
          border-width: 0;
        }
      }
    }
  }
}
</style>
