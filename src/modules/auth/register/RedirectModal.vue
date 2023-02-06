<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';

// i18n
const { t } = useI18n();

const showNotification = ref(true);
</script>

<template>
  <Transition>
    <div id="redirectModal" class="container" v-if="showNotification">
      <header>
        <div>
          <v-icon class="mr-1">mdi-check-circle-outline</v-icon>
          <span class="body-md">
            {{ t('registration.email_sent.title') }}
          </span>
        </div>
        <v-icon @click="() => (showNotification = false)" class="close"
          >mdi-close</v-icon
        >
      </header>
      <main class="body-sm">
        {{ t('registration.email_sent.content') }}
      </main>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.close {
  color: $color-success-600;
}
.container {
  padding: 16px 12px;
  background: $color-success-50;
  max-width: 470px;

  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    color: $color-success-800;

    > div {
      display: flex;
      align-items: center;
    }
  }

  main {
    border-top: 1px solid $color-success-100;
    padding-top: 1rem;
    color: $color-success-900;
  }
}

@media screen and (min-width: $sm-breakpoint-max) {
  .body-md {
    font-size: 1.15rem;
    font-weight: bold;
  }

  .body-sm {
    font-size: 0.875rem;
  }
}
</style>
