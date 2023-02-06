<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useForm, useFormValues } from 'vee-validate';
import { UserDetails } from '@/_store/registration/types';
import * as yup from 'yup';
import { useI18n } from 'vue-i18n';
import Api from '@/services/registration.api';
import { AxiosError, AxiosResponse } from 'axios';
import { useUser } from '@/_store/user';
import InputFieldWithValidations from '@/shared/forms/InputFieldWithValidations.vue';
import SelectField from '@/shared/forms/SelectField.vue';
import { useLoader } from '@/_store/loader';
import { useRegistration } from '@/_store/registration';
import { useRouter } from 'vue-router';
import { getShiftJISByteLength } from '@/_helpers/validators';
import { ShopErrors } from '@/_types/validationErrors.type';
import Checkbox from '@/shared/forms/Checkbox.vue';
import Loader from '@/shared/components/Loader.vue';
import { ToastType } from '@/_store/toast/types';
import { useToast } from '@/_store/toast';

const { t } = useI18n();

const userStore = useUser();
const loader = useLoader();
const registrationStore = useRegistration();
const contactUrl = import.meta.env.VITE_APP_CONTACT_URL;

const router = useRouter();

const toast = useToast();

const emit = defineEmits<{
  (e: 'stepChange', step: number): void;
  (e: 'showPage', shouldShow: boolean): void;
}>();

// Validation rules
const maxShopNameLength = 20;
const schema = yup.object({
  userEmail: yup.string().email(),
  userDetails: yup.object({
    shop: yup.object({
      name: yup
        .string()
        .required()
        .validShopNameLength()
        .max(maxShopNameLength),
      industry_id: yup.string().required(),
      platform_id: yup.string().required(),
      shop_url: yup.string().required().max(150).url().urlRegexValidator(),
      shop_id: yup
        .string()
        .max(100)
        .when('platform_id', {
          is: (platform_id: string) =>
            ['futureshop', 'MakeShop'].includes(platform_id),
          then: yup.string().required().max(100),
        }),
    }),
    terms: yup
      .bool()
      .required()
      .oneOf([true], t('form.term_warning').toString()),
  }),
});

const { isSubmitting, handleSubmit, resetForm, meta, setFieldValue } = useForm({
  validationSchema: schema,
});

const formValues = useFormValues();

const WordPressUrl = import.meta.env.VITE_APP_WP_URL;

// Platforms that need to be checked
const platformsList: string[] = [
  'カラーミーショップ',
  'base',
  'shopify',
  'wordpress',
  'wordpress_welcart',
  'wordpress_woocommerce',
  'other_non_ec',
  'other_ec',
];
const nonEcPlatforms: string[] = ['wordpress', 'other_non_ec'];

// Objects filled by Endpoints
const industries = ref([]);
const platforms = ref([]);
const backendErrorMsg = ref<ShopErrors>({});
const shopErrorMsg = ref('');

// Helper Vars
const userEmail = ref('');
const showShopId = ref(false);
const loading = ref(false);
const loadingInfo = ref(true);
const shopName = ref('shop_name');
const shopURL = ref('shop_URL');
const nonEC = ref(false);
const byteLength = ref('twoByte');
const shopType = ref('shop_name');
const filteredIndustries = ref([]);
const isAffiliate = ref(false);

const contactSupport: any = t('form.contact_non_ec', {
  link: `<a class="has-text-info" href="https://adsist.zendesk.com/hc/ja/requests/new" target="_blank">${t(
    'form.inquiry',
  )}</a>`,
});

const getUserDetails = () => {
  Api.getUserDetails()
    .then((response: AxiosResponse) => {
      let user = response.data as UserDetails;
      userStore.setUserType(user.user_type);
      setFieldValue('userDetails.name', user.name);
      setFieldValue('userEmail', userEmail.value);

      if (user.email) {
        userStore.updateEmail(user.email);
        userEmail.value = userStore.getEmail;
        setFieldValue('userEmail', user.email);
      }

      if (user.shop) {
        setFieldValue('userDetails.shop', user.shop);
        setFieldValue('userDetails.name', user.name);
      }

      // Update for affiliate
      if (user.affiliate) {
        loader.updateLogo(user.affiliate_user);
        emit('showPage', true);
        isAffiliate.value = true;
      } else {
        emit('showPage', true);
      }

      // Filter shop depending on the user type (affiliate or not)
      if (!isAffiliate.value) {
        let hiddenPlatforms: string[] = [
          'wordpress_welcart',
          'wordpress_woocommerce',
          'wordpress',
          'other_ec',
          'other_non_ec',
        ];
        platforms.value = platforms.value.filter(
          (platform: string) =>
            !hiddenPlatforms.includes(platform.toLocaleLowerCase()),
        );
      }
    })
    .catch((error: AxiosError) => {
      // If error send back to login page
      router.push({ name: 'login' });
      // messageGenerator(error, 'getUserDetails');
    });
};

const getIndustries = (): Promise<any> => {
  return Api.getIndustries()
    .then((response: AxiosResponse) => {
      if (response) {
        industries.value = response.data;
      }
    })
    .catch((error: AxiosError) => {
      // messageGenerator(error, 'getIndustries');
    });
};

const getPlatforms = (): Promise<any> => {
  return Api.getPlatforms()
    .then((response: AxiosResponse) => {
      if (response) {
        platforms.value = response.data;
      }
    })
    .catch((error) => {
      // messageGenerator(error, 'getPlatforms');
    });
};

onMounted(() => {
  emit('stepChange', 1);
  userEmail.value = userStore.getEmail;

  let pIndustries = getIndustries();
  let pPlatforms = getPlatforms();

  Promise.all([pIndustries, pPlatforms])
    .then(() => {
      getUserDetails();
    })
    .catch((error: AxiosError) => {
      if (error) {
        errorHandler(error);
      }
    })
    .finally(() => {
      loadingInfo.value = false;
    });

  watch(
    () => formValues.value.userDetails.shop.platform_id,
    (value, oldValue) => {
      userStore.updatePlatform(formValues.value.userDetails.shop.platform_id);
      if (
        value &&
        value !== oldValue &&
        platformsList.includes(value.toLowerCase())
      ) {
        showShopId.value = false;

        // Creates the shopID as PROVIDER_DATE
        setFieldValue(
          'userDetails.shop.shop_id',
          `${value.toUpperCase()}_${Date.now()}`,
        );

        if (nonEcPlatforms.includes(value.toLowerCase())) {
          shopName.value = 'site_name';
          shopURL.value = 'site_URL';
          nonEC.value = true;
        } else {
          shopName.value = 'shop_name';
          shopURL.value = 'shop_URL';
          nonEC.value = false;
        }
      } else if (value && !showShopId.value) {
        showShopId.value = true;
        setFieldValue('userDetails.shop.shop_id', '');
        shopName.value = 'shop_name';
        shopURL.value = 'shop_URL';
        nonEC.value = false;
      }

      if (nonEC.value) {
        shopType.value = 'site_name';
      } else {
        shopType.value = 'shop_name';
      }

      filteredIndustries.value = industries.value.filter(
        (industry: any) =>
          industry.type.toLowerCase() === (nonEC.value ? 'non-ec' : 'ec'),
      );
    },

    { immediate: true },
  );
});

const nextStep = handleSubmit(() => {
  // this.meta.$touch();
  if (meta.value.valid) {
    loading.value = true;
    userStore.updatePlatform(formValues.value.userDetails.shop.platform_id);

    updateUser();
  }
});

const errorHandler = (error: any) => {
  toast.append({
    message: error.response.data.message,
    type: ToastType.danger,
    isSnackbar: true,
  });

  registrationStore.changeStepAction('1');
  loading.value = false;
  loadingInfo.value = false;
  isSubmitting.value = false;
};

const updateUser = () => {
  Api.putUserDetails(formValues.value.userDetails)
    .then(() => {
      registrationStore.changeStepAction('2');
      router.push({
        name: userStore.isColormeAppStoreUser
          ? 'colormeRegisterConfirmInput'
          : 'registerSelectPlan',
      });
    })
    .catch((error: AxiosError) => {
      errorHandler(error);
      // messageGenerator(error, 'putUserDetails');
    });
};

const formLabel = computed(() => {
  {
    return t(
      `form.${
        formValues.value.userDetails?.shop.platform_id ===
        t('platform.futureshop')
          ? 'store_key'
          : 'shop_ID'
      }`,
    );
  }
});

const stringLength = computed(() => {
  {
    if (formValues.value.userDetails.shop.name) {
      return getShiftJISByteLength(formValues.value.userDetails.shop.name);
    } else {
      return 0;
    }
  }
});
</script>

<template>
  <div class="content-container">
    <h5 class="mb-4">
      {{ t('registration.content.basic_info') }}
    </h5>

    <form id="step1Form">
      <InputFieldWithValidations
        name="userEmail"
        id="userEmail"
        :label="t('form.email')"
        type="email"
        placeholder="johndoe@gmail.com"
        :is-required="true"
        :disabled="true"
      />

      <!-- PLATFORM ID -->
      <SelectField
        id="platformId"
        variant="outlined"
        name="userDetails.shop.platform_id"
        :label="t('form.select_platform')"
        :items="platforms"
        :disabled="userStore.isColormeAppStoreUser"
        :description="t('form.platform_description', { url: contactUrl })"
      ></SelectField>

      <!-- SHOP NAME -->
      <InputFieldWithValidations
        id="shopName"
        type="text"
        name="userDetails.shop.name"
        placeholder="これからショップ"
        :isRequired="true"
        :label="t(`form.${shopName}`)"
        :maxLengthMode="byteLength"
        :description="t('form.shop_name_description')"
      >
        <p class="help is-danger" v-if="shopErrorMsg">
          {{ shopErrorMsg }}
        </p>

        <p class="help is-danger" v-else-if="stringLength > maxShopNameLength">
          {{
            t('validations.byte_max_length', {
              full_width: maxShopNameLength / 2,
              half_width: maxShopNameLength,
            })
          }}
        </p>

        <p class="help">
          {{ t('form.shopname_length', { shopType: $t(`form.${shopType}`) }) }}
        </p>
      </InputFieldWithValidations>

      <!-- INDUSTRY ID -->
      <SelectField
        variant="outlined"
        id="industryId"
        name="userDetails.shop.industry_id"
        :label="t('form.select_industry')"
        :items="filteredIndustries"
        itemTitle="name"
        itemValue="_id"
      ></SelectField>

      <div class="last-row">
        <!-- SHOP URL -->
        <InputFieldWithValidations
          type="text"
          id="shopUrl"
          :label="t(`form.${shopURL}`)"
          name="userDetails.shop.shop_url"
          placeholder="https://corekara.co.jp/"
          :messages="nonEC ? [t('form.wordPress_https_notice')] : []"
          :error-messages="
            backendErrorMsg.shop?.name || backendErrorMsg.shop?.shop_url
          "
        />

        <!-- SHOP ID -->
        <InputFieldWithValidations
          id="shopId"
          type="text"
          v-show="showShopId"
          name="userDetails.shop.shop_id"
          placeholder="12345"
          :label="formLabel"
          :isRequired="true"
        />
      </div>

      <!-- TERMS -->
      <div class="field">
        <Checkbox id="acceptTerms" name="userDetails.terms" class="checkbox">
          <a :href="`${WordPressUrl}/terms`" target="_blank" class="tos-link">
            {{ t('terms.terms_of_use_link') }}
          </a>
          <span class="checkbox">{{
            ' ' + t('terms.accept_terms_of_use')
          }}</span>
        </Checkbox>
      </div>

      <v-btn
        id="goToStep2Btn"
        class="button is-block primary-btn button-m"
        :loading="loading || isSubmitting"
        :disabled="isSubmitting || !meta.valid"
        @click.prevent="nextStep"
      >
        {{ t('form.next_step_btn') }}
      </v-btn>

      <Loader :show="loadingInfo" />
    </form>
  </div>
</template>

<style lang="scss" scoped>
.last-row {
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;

  > div {
    flex: 2;

    &:nth-child(2) {
      flex: 1;
    }
  }

  @media screen and (max-width: $sm-breakpoint-max) {
    flex-direction: column;
    gap: 0;
  }
}

.primary-btn {
  margin-left: auto;
  padding: 0.5rem 5rem;
  height: max-content;
  margin-top: -2rem;

  @media screen and (max-width: $sm-breakpoint-max) {
    width: 100%;
  }
}

.checkbox {
  color: $color-neutral-700;
}

.content-container {
  width: clamp(320px, 100%, 720px);
  padding: 1.5rem 0;
}

.accept-tos {
  color: #333;
}

.tos-link {
  @include body-sm;
  color: $color-primary-500;
  border-bottom: 1px solid $color-primary-500;
}
</style>

<style lang="scss">
input[type='checkbox'] + .check {
  border-color: #7a7a7a !important;
}
</style>
