<script lang="ts" setup>
import { reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useModal } from '@/_store/modal';
import { useI18n } from 'vue-i18n';

// i18n
const { t } = useI18n();

// Initialized modal
const modal = useModal();

// Reactive container to save the payload returned by the mounted view
const model = reactive({});

// Convert all state properties to reactive references to be used on view
const { isOpen, view } = storeToRefs(modal);

function onBackgroundClicked(): void {
  if (modal.outsideClick) {
    modal.close();
  }
}
</script>

<template>
  <div v-if="isOpen">
    <div
      class="modal-background"
      @click="onBackgroundClicked"
      :class="{ closing: modal.isClosing }"
    >
      <label
        class="modal-close-button"
        @click="modal.close()"
        v-if="!modal.removeCancelButton"
        >✕</label
      >
    </div>

    <div class="modal-card-content">
      <component :is="view" v-bind="modal.props"></component>

      <div class="modal-action">
        <button @click="modal.close()" v-if="!modal.removeCancelButton">
          {{ t('modal.cancel') }}
        </button>
        <button
          v-if="modal.actions?.length && modal.actions?.length > 0"
          v-for="action in modal.actions"
          class="btn"
          @click="action.callback(model)"
        >
          {{ action.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.modal-background {
  width: 100vw;
  background-color: rgba(black, 0.5);
  position: fixed;
  z-index: 10000;
  transition: all 0.5s ease-in-out;

  &.closing {
    opacity: 0;
  }
}

.modal-card-content {
  position: fixed;
  z-index: 10001;
  margin: auto;
  width: clamp(300px, calc(100vw - 40px), 60rem);
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}

.modal-close-button {
  position: fixed;
  right: 1rem;
  top: 1rem;
  color: white;
  cursor: pointer;
}
</style>
