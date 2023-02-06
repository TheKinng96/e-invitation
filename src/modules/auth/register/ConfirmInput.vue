<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import Api from '@/services/registration.api';
import { useUser } from '@/_store/user';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useRegistration } from '@/_store/registration';
import { useAccountCreation } from '@/modules/auth/composables/useAccountCreation';
import Loader from '@/shared/components/Loader.vue';

const emit = defineEmits<{
  (e: 'stepChange', step: number): void;
}>();

const { t } = useI18n();

const router = useRouter();
const route = useRoute();

const user = useUser();
const registrationStore = useRegistration();

const { createAccount, isAccountCreateLoading } = useAccountCreation();

const loadingInfo = ref(true);
const loading = ref(false);
const validPages = ['One', 'Two', 'Three', 'Four'];
const validPageNames = ['BasicInfo', 'SelectPlan', 'ConfirmInput', 'Payment'];
let userDetails = reactive({
  name: '',
  email: '',
  password: '',
  company: '',
  shop: {
    name: '',
    shop_id: '',
    platform_id: 'default',
    site_url: '',
    shop_url: '',
    industry: {
      name: '',
    },
    platform: {
      name: '',
    },
  },
  plan: {
    name: '',
  },
  shopify_link: {
    url: '',
    callback_url: '',
    callback_method: '',
    redirect_url: '',
  },
  user_type: '',
});
const showShopId = ref(true);
const shopName = ref('shop_name');
const shopURL = ref('shop_URL');
const platformsWithShopId: string[] = ['makeshop', 'futureshop'];
const platformsHasNoShopName: string[] = [
  'wordpress',
  'other_non_ec',
  'wordpress_welcart',
  'wordpress_woocommerce',
];

onMounted(() => {
  getUserReviewInformation();
  emit('stepChange', user.isColormeAppStoreUser ? 2 : 3);
});

const getUserReviewInformation = () => {
  loadingInfo.value = true;
  Api.getUserReviewInformation()
    .then((response: any) => {
      if (response) {
        userDetails = response.data;
        userDetails.password = '********';
        user.setUserType(userDetails.user_type);
        let platform = userDetails.shop.platform_id.toLowerCase();
        if (!platformsWithShopId.includes(platform.toLowerCase())) {
          showShopId.value = false;
          if (platformsHasNoShopName.includes(platform.toLowerCase())) {
            shopName.value = 'site_name';
            shopURL.value = 'site_URL';
          }
        }
      }
    })
    .catch((error) => {
      //   messageGenerator(error, 'getUserReviewInformation');
    })
    .finally(() => {
      loadingInfo.value = false;
    });
};

const goToNextStep = () => {
  if (user.isColormeAppStoreUser) {
    createAccount();
  } else {
    goToStep('Four');
  }
};

const goToStep = (page: string) => {
  loading.value = true;

  if (page.toLowerCase() === 'two') {
    user.updatePlan('');
  }

  if (validPages.includes(page)) {
    let index = validPages.indexOf(page);
    registrationStore.changeStepAction(index + 1);

    if (
      userDetails.shop.platform_id.toLowerCase() === 'shopify' &&
      validPageNames[index] === 'Payment'
    ) {
      let localCallback = {
        callback_url: userDetails.shopify_link.callback_url,
        callback_method: userDetails.shopify_link.callback_method,
        redirect_url: userDetails.shopify_link.redirect_url,
      };

      window.localStorage.setItem(
        'localCallback',
        JSON.stringify(localCallback),
      );

      window.location.href = userDetails.shopify_link.url;
    } else {
      router.push({ name: `register${validPageNames[index]}` });
    }
  }
};
const formLabel = computed(() => {
  return t(
    `form.${
      userDetails.shop.platform_id === t('platform.futureshop')
        ? 'store_key'
        : 'shop_ID'
    }`,
  );
});

const prevStep = () => {
  if (route.name === 'colormeRegisterConfirmInput') {
    registrationStore.changeStepAction('1');
    router.push({ name: 'colormeRegisterBasicInfo' });
  } else {
    registrationStore.changeStepAction('2');
    router.push({ name: 'registerSelectPlan' });
  }
};
</script>

<template>
  <div class="container">
    <form id="step4Form">
      <section class="">
        <h3 class="title">
          {{ $t('registration.content.almost_there') }}
        </h3>
        <div class="card">
          <header class="card-header">
            <p
              class="card-header-title has-text-white"
              v-html="$t('registration.content.personal_information')"
            ></p>
            <span
              id="goToStepOneUserDetails"
              class="icon pointer"
              @click="goToStep('One')"
            >
              <v-icon aria-hidden="true">mdi-pencil</v-icon>
            </span>
          </header>
          <dl class="card-content">
            <div class="definition-group">
              <dt>{{ $t('form.email') }}</dt>
              <dd>
                {{ userDetails.email }}
              </dd>
            </div>

            <div class="definition-group">
              <dt>{{ $t('form.platform_name') }}</dt>
              <dd>
                {{
                  $t(`registration_platforms.${userDetails.shop.platform_id}`)
                }}
              </dd>
            </div>

            <div class="definition-group">
              <dt>{{ $t(`form.${shopName}`) }}</dt>
              <dd>
                {{ userDetails.shop.name }}
              </dd>
            </div>

            <div class="definition-group">
              <dt>{{ $t('form.industry_name') }}</dt>
              <dd>
                {{ userDetails.shop.industry.name }}
              </dd>
            </div>

            <div class="definition-group">
              <dt>{{ $t(`form.${shopURL}`) }}</dt>
              <dd>
                {{ userDetails.shop.shop_url }}
              </dd>
            </div>

            <div class="definition-group" v-if="showShopId">
              <dt>{{ formLabel }}</dt>
              <dd>
                {{ userDetails.shop.shop_id }}
              </dd>
            </div>
          </dl>
        </div>

        <div id="planWrapper" class="card">
          <header class="card-header">
            <p
              class="card-header-title has-text-white"
              v-html="$t('registration.content.plan_details')"
            ></p>
            <span
              id="goToStepTwo"
              class="icon pointer"
              @click="goToStep('Two')"
              v-if="!user.isColormeAppStoreUser"
            >
              <v-icon aria-hidden="true">mdi-pencil</v-icon>
            </span>
          </header>
          <dl class="card-content">
            <div class="definition-group">
              <dt>{{ $t('form.plan') }}</dt>

              <dd>
                {{ userDetails.plan.name }}
              </dd>
            </div>
          </dl>
        </div>

        <footer>
          <v-btn
            color="secondary"
            class="secondary-btn step-btn"
            @click.prevent="prevStep"
          >
            {{ $t('form.back_btn') }}
          </v-btn>
          <v-btn
            color="primary"
            class="primary-btn step-btn"
            id="nextStep"
            :loading="loading"
            :disabled="loading"
            @click.prevent="goToNextStep"
          >
            {{
              userDetails.shop.platform_id.toLowerCase() === 'shopify'
                ? $t('form.next_step_shopify_btn')
                : $t('form.next_step_btn')
            }}
          </v-btn>
        </footer>

        <div
          class="mt-5"
          v-if="userDetails.shop.platform_id.toLowerCase() === 'shopify'"
        >
          <small class="has-text-primary">
            {{ $t('registration.content.shopify_step_three') }}
          </small>
        </div>
      </section>

      <Loader :show="loadingInfo" />

      <Loader :show="isAccountCreateLoading">
        <div class="custom-loading">
          <div class="loading-icon" />
          <p v-html="$t('registration.content.creating_account')"></p>
        </div>
      </Loader>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 1.25rem;
  @media screen and (min-width: 1024px) {
    padding: 0rem;
  }
}

.title {
  font-weight: 700;
  margin-bottom: 1.75rem;
  font-size: 1.5rem;
}

.card-content {
  padding: 0rem 1rem;
  background-color: $color-neutral-100;

  @media screen and (min-width: $sm-breakpoint-min) {
    padding: 0 1.5rem;
  }
}

.definition-group {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 1rem 0;
  font-size: 0.9rem;

  &:not(:last-child) {
    border-width: 0 0 1px 0;
    border-color: $color-neutral-300;
    border-style: solid;
  }

  dt {
    @include body-sm;
    font-weight: 400;
    position: relative;
    margin-right: 1rem;
    color: #7a7a7a;
    color: $color-neutral-800;
  }

  dd {
    @include label-sm;
    color: $color-neutral-700;
    font-weight: 500;
    word-break: break-all;
  }

  @media screen and (max-width: 400px) {
    flex-direction: column;

    dd {
      align-self: end;
    }
  }

  @media screen and (min-width: $sm-breakpoint-min) {
    padding: 1.5rem 0;

    dt {
      @include body-md;
    }

    dd {
      @include label-lg;
    }
  }
}

footer {
  display: flex;
  margin-top: 2rem;
  justify-content: space-between;

  @media screen and (min-width: $sm-breakpoint-min) {
    justify-content: end;
    gap: 1.5rem;

    > .secondary-btn,
    > .primary-btn {
      max-width: 220px;
      min-width: unset;
      width: 100%;
    }
  }
}

.title-message {
  padding-bottom: 1.5em;
  font-size: 0.9em;
  margin-top: -0.5rem;
}

.card-header {
  color: var(--theme-textActive);
  background-color: $color-primary-400;
  padding: 0.5rem 1rem;

  .card-header-title {
    @include body-md;
    font-weight: 500;
    padding: 0;

    @media screen and (min-width: $sm-breakpoint-min) {
      padding: 0 1.5rem;
    }
  }
  .icon {
    padding: 1.5em;
  }
}

.card {
  margin-bottom: 1em;
  box-shadow: none;
  border-radius: 10px;
  overflow: hidden;

  > header {
    margin: 0;
  }
}

#planWrapper {
  margin-top: 2.5rem;
}

.pointer {
  cursor: pointer;
}

.subtitle.divider {
  padding-bottom: 2em;
  border-bottom: 1px solid lightgray;
}

.divider {
  border-bottom: 1px solid lightgray;
}

.custom-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 500px;
  max-width: 90%;
  border: 2px solid #dbdbdb;
  border-radius: 0.75rem;
  padding: 3.5rem;
  background: rgba(255, 255, 255, 0.9);

  p {
    color: #454545;
    font-size: 1.25rem;
    font-weight: 500;
    text-align: center;
  }

  .loading-icon::after {
    position: relative;
    border-right-color: transparent;
    border-top-color: transparent;
    margin-bottom: 3.5rem;
  }
}
</style>
