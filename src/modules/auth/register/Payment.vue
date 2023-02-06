<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AccountApi from '@/services/account.api';
import { ICardGmoDetails } from '@/_types/account.type';
import { useAccountCreation } from '@/modules/auth/composables/useAccountCreation';
import CreditCardGmo from '@/components/CreditCardGmo.vue';
import Loader from '@/shared/components/Loader.vue';

const emit = defineEmits<{
  (e: 'stepChange', step: number): void;
}>();

const { createAccount, isAccountCreateLoading, cleanError, cardError, error } =
  useAccountCreation();

const isGettingCardInfo = ref(false);
const cardGmoDetails = ref<ICardGmoDetails>({
  cardNo: '',
  expire: '',
  brand: '',
  is_card_blocked: false,
});

onMounted(() => {
  emit('stepChange', 4);
  getCardInfo();
});

const getCardInfo = () => {
  isGettingCardInfo.value = true;
  AccountApi.searchUserCardGmo()
    .then((res) => {
      cardGmoDetails.value = res.data as ICardGmoDetails;
    })
    .catch((err) => {
      // messageGenerator(err, 'getCardInfo');
    })
    .finally(() => {
      isGettingCardInfo.value = false;
    });
};

const setCardBlocked = () => (cardGmoDetails.value.is_card_blocked = true);
</script>

<template>
  <div class="box">
    <div class="container">
      <h5>
        {{ $t('registration.content.credit_card') }}
      </h5>
      <div id="paymentForm" v-if="!isGettingCardInfo">
        <credit-card-gmo
          :callback="createAccount"
          :blocked-callback="setCardBlocked"
          :is-blocked="cardGmoDetails.is_card_blocked"
          :error="error"
          :cleanError="cleanError"
        />
        <div id="cardErrors" role="alert">
          <p v-for="(error, index) in cardError" :key="index">{{ error }}</p>
        </div>
      </div>

      <Loader :show="isGettingCardInfo" />

      <Loader :show="isAccountCreateLoading">
        <div class="custom-loading">
          <div class="loading-icon" />
          <p v-html="$t('registration.content.creating_account')"></p>
        </div>
      </Loader>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: column;
  padding: 1.25rem;

  h5 {
    font-weight: 500;
    color: $color-neutral-800;
  }

  @media screen and (min-width: $sm-breakpoint-min) {
    > .container {
      padding: 1rem;
    }
  }
}

#cardErrors {
  color: red;
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
