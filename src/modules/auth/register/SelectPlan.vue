<script setup lang="ts">
import { onMounted } from 'vue';
import SelectPlan from '@/shared/forms/ListPlans.vue';
import { useLoader } from '@/_store/loader';
import { useRegistration } from '@/_store/registration';
import { useUser } from '@/_store/user';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const namespace = 'step';

const emit = defineEmits<{
  (e: 'stepChange', step: number): void;
  (e: 'showPage', shouldShow: boolean): void;
}>();

const { t } = useI18n();

const router = useRouter();

const userStore = useUser();
const loader = useLoader();
const registrationStore = useRegistration();

onMounted(() => emit('stepChange', 2));

const nextStep = (returnOk: boolean) => {
  if (returnOk) {
    registrationStore.changeStepAction('4');
    router.push({ name: 'registerConfirmInput' });
  } else {
    registrationStore.changeStepAction('1');
  }
};

const prevStep = (returnOk: boolean) => {
  registrationStore.changeStepAction('1');
  router.push({ name: 'registerBasicInfo' });
};
</script>

<template>
  <div class="container">
    <h5 class="title">
      {{ $t('registration.content.select_plan') }}
    </h5>

    <select-plan :callback="nextStep" />

    <footer>
      <v-btn
        color="secondary"
        class="secondary-btn step-btn"
        @click.prevent="prevStep"
      >
        {{ $t('form.back_btn') }}
      </v-btn>
    </footer>
  </div>
</template>

<style scoped lang="scss">
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
  color: $color-neutral-800;
}

footer {
  display: flex;
  justify-content: end;
  margin-top: 2.5rem;
  margin-right: 1.25rem;
}

@media screen and (max-width: $sm-breakpoint-max) {
  footer {
    justify-content: start;
  }
}
</style>
