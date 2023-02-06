<script setup lang="ts">
import { PlanType } from '@/_types/shared.types';
import { useI18n } from 'vue-i18n';
import { computed, ref } from 'vue';
import { useLoader } from '@/_store/loader';
import { useUser } from '@/_store/user';

const props = withDefaults(
  defineProps<{
    plan: PlanType;
    isShopify: boolean;
    isRegistration?: boolean;
    plusPlanId: string;
    sendingForm: boolean;
  }>(),
  {
    isShopify: false,
    isRegistration: true,
    plusPlanId: '',
    sendingForm: false,
  },
);

const emit = defineEmits<{
  (e: 'selectedPlan', plan: PlanType): void;
}>();

const { t, n } = useI18n();

const loader = useLoader();
const user = useUser();
const isLoading = ref(false);

const isFreePlan = computed(() => {
  {
    // Affiliate with special plan will not have the free-service campaign
    if (
      props.isRegistration &&
      loader.getAffiliateCompany &&
      props.plan.price === 0
    ) {
      return !loader.getAffiliateUser?.use_special_plans;
    } else if (user.getUser.affiliate_user && props.plan.price === 0) {
      // On account page
      return !user.getUser.affiliate_user.use_special_plans;
    }

    return props.plan.price === 0;
  }
});

const selectPlan = (plan: PlanType) => {
  isLoading.value = true;
  emit('selectedPlan', plan);
};

const disablePlan = (plan: PlanType) => {
  if (props.isRegistration) {
    return false;
  }

  if (user.getUser.current_plan_id === props.plusPlanId) {
    return false;
  }

  if (user.getUser.plan_id === props.plusPlanId) {
    return true;
  }
  if (
    user.getUser.current_plan_id === plan._id &&
    plan._id === user.getUser.plan_id
  ) {
    return true;
  } else {
    if (user.getUser.plan_id === plan._id) {
      return true;
    }
  }
};

const checkPlanStatus = (plan: PlanType) => {
  if (props.isRegistration) {
    return t('plan.select');
  }

  if (!user.getUser.current_plan_id) {
    if (user.getUser.plan_id === plan._id) {
      return t('plan.this_month');
    }
    return t('plan.select');
  } else {
    if (
      user.getUser.current_plan_id === plan._id &&
      user.getUser.current_plan_id === user.getUser.plan_id
    )
      return t('plan.this_month');
    else if (user.getUser.plan_id === plan._id) return t('plan.next_month');
    else if (user.getUser.current_plan_id === plan._id)
      return t('plan.this_month');
  }

  return t('plan.select');
};
</script>

<template>
  <div class="card">
    <header class="card-header">
      <div class="details has-text-centered">
        <h4 class="name">
          {{ plan.name }}
        </h4>
        <span v-if="isShopify" class="plan-price">
          <h2 class="price"><span>$</span>{{ $n(plan.price_usd!) }}</h2>
          <h6 class="month">/ {{ $t('plan.month') }}</h6>
        </span>
        <span v-else class="plan-price">
          <h2 class="price">¥{{ $n(plan.price) }}</h2>
          <h6 class="month">/ {{ $t('plan.month') }}</h6>
        </span>
      </div>
    </header>

    <div class="card-desc">
      {{ plan.description }}
    </div>

    <div class="card-content">
      <div class="content">
        <p v-if="isShopify">
          {{ $t('plan.price_description') }}
          <span v-if="isFreePlan">{{ $t('plan.price_description_free') }}</span>
          <span v-else
            >{{ $n(plan.price_usd!)
            }}<span>{{ $t('plan.use_dollar') }}</span></span
          >
        </p>
        <p v-else>
          {{ $t('plan.price_description') }}
          <span v-if="isFreePlan">{{ $t('plan.price_description_free') }}</span>
          <span v-else>
            ¥{{ $n(plan.price) }} <span>/ {{ $t('plan.month') }} </span></span
          >
        </p>

        <p>
          {{ $t('plan.charge_details') }}<span>{{ plan.charges }}</span
          >％
        </p>
      </div>
    </div>

    <footer class="card-footer">
      <v-btn
        color="primary"
        class="button is-block is-medium is-fullwidth button-m"
        :class="{ 'is-loading': plan.loading }"
        :disabled="sendingForm || disablePlan(plan)"
        :loading="isLoading"
        @click.prevent="selectPlan(plan)"
      >
        {{ checkPlanStatus(plan) }}
      </v-btn>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
button.is-primary,
button.is-primary[disabled] {
  color: var(--theme-textActive);
  background-color: var(--theme-primary);
  &:hover,
  &:active,
  &:focus:not(:active) {
    color: var(--theme-textActive);
    background-color: var(--theme-primaryHover);
  }
}

.card {
  box-shadow: 0px 8px 16px rgba(34, 41, 149, 0.08),
    0px 24px 64px rgba(34, 41, 149, 0.04);
  border-radius: 10px;
  border: 1px solid #eee;
  text-align: center;
  height: 100%;
  width: 100%;
  padding: 1.5rem 1rem;

  @media screen and (min-width: $sm-breakpoint-min) {
    padding: 2.5rem 2rem;
  }

  .card-content {
    font-size: 1.25rem;

    p {
      font-size: 1rem;
      font-weight: 400;
      color: $color-neutral-600;
      letter-spacing: -0.025em;
    }
  }

  display: flex;
  flex-direction: column;

  .card-header {
    padding: 0 0.25rem;
    box-shadow: none;

    .details {
      color: $color-neutral-800;
      width: 100%;

      .name {
        font-size: 1.5rem;
        font-weight: 700;
      }
      .plan-price {
        display: flex;
        justify-content: center;
        align-items: baseline;
        gap: 0.25rem;
        margin: 1rem 0rem 1.75rem 0rem;
        color: $color-neutral-800;
        letter-spacing: -0.025em;
      }

      .price {
        font-size: 3rem;
        color: $color-neutral-800;
        font-weight: 700;
      }

      .month {
        font-size: 1.125em;
        color: $color-neutral-800;
        font-weight: 700;
      }
    }
  }

  .card-desc {
    @include body-lg-link;
    color: $color-primary-800;
    background: $color-primary-50;
    padding: 0.25rem;
    width: 100%;
    font-weight: 600;
  }

  .card-content {
    margin-top: 1.75rem;
    font-size: 1.125rem;
    color: $color-neutral-600;
    padding: 0;
    font-weight: 400;
    flex: 1;

    p {
      @include body-lg;

      &:last-child {
        margin-top: 1.5rem;
      }
    }

    .strike-through {
      text-decoration-line: line-through;
    }
    .free-plan-details {
      font-size: 0.85em;
    }
  }

  .card-footer {
    border: none;
    margin-top: 2rem;
  }

  .button {
    margin-top: 2rem;
    padding: 1rem 1.25rem;
    border-radius: 0.6rem;
    background-color: $color-primary-500;
    color: white;
    font-weight: 700;
    font-size: 1rem;
    height: auto;
    border-radius: 0.25rem;
  }
}
</style>
