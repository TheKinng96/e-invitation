<script setup lang="ts">
import { useToast } from '@/_store/toast';
import { IToast } from '@/_store/toast/types';
import { watch } from 'vue';

// Store
const state = useToast();

watch(state.getToasts, (queue) => {
  if (queue.length > 0) {
    close(queue[0]);
  }
});

const close = (toast: IToast): void => {
  if (toast.isSnackbar) {
    return;
  }

  setTimeout(() => {
    state.remove();
  }, toast.duration);
};
</script>

<template>
  <div class="toasts-container">
    <TransitionGroup name="slide-fade">
      <div v-for="toast in state.getToasts" :key="toast.id">
        <div
          class="toast"
          :class="[toast.type, { 'is-snackbar': toast.isSnackbar }]"
          v-if="toast"
        >
          <span v-html="toast.message"></span>
          <button @click="state.remove" v-if="toast.isSnackbar">
            <i class="fas fa-times-circle"></i>
          </button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped>
.toasts-container {
  position: fixed;
  z-index: 100000;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 0.5rem;

  .toast {
    background-color: rgb(var(--v-theme-box-shadow));
    color: rgb(var(--v-theme-background));
    text-align: center;
    padding: 0.75rem 1.5rem;
    border-radius: 1.5rem;
    box-shadow: 0px 2px 8px 2px rgba(var(--v-theme-box-shadow), 0.2);
    margin-top: 0.5rem;
    width: clamp(18rem, 320px, 60rem);

    &.is-snackbar {
      border-radius: 0.2rem;
      background-color: rgb(var(--v-theme-background));
      color: rgb(var(--v-theme-box-shadow));
      display: flex;
      gap: 1rem;
      justify-content: space-between;
    }

    &.is-success {
      background-color: rgb(var(--v-theme-success));
    }
    &.is-warning {
      background-color: rgb(var(--v-theme-warning));
      color: rgb(var(--v-theme-box-shadow));
    }
    &.is-danger {
      background-color: rgb(var(--v-theme-danger));
      color: $color-white;
    }
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}
</style>
