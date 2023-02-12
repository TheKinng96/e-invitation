
import { markRaw } from "vue";
import { defineStore } from "pinia";

// Reference: https://dev.to/cloudx/reusable-dynamic-modal-on-vue-3-1k56
export type Modal = {
  isOpen?: boolean,
  view: object,
  props?: object,
  actions?: ModalAction[],
  outsideClick?: boolean,
  removeCancelButton?: boolean,
  closing?: boolean,
};

export type ModalAction = {
  label?: string,
  callback: (props?: any) => void,
};

export const useModal = defineStore("modal", {
  state: (): Modal => ({
    isOpen: false,
    outsideClick: true,
    view: {},
    actions: [],
    closing: false,
  }),
  actions: {
    open(modalData: Modal) {
      this.props = modalData.props;
      this.isOpen = true;
      this.outsideClick = modalData.outsideClick ?? true;
      this.actions = modalData.actions;
      this.removeCancelButton = modalData.removeCancelButton ?? false;
      this.closing = false;
      // Using markRaw to avoid over performance as reactive is not required
      this.view = markRaw(modalData.view);
    },
    close() {
      this.isOpen = false;
      this.view = {};
      this.actions = [];
      this.closing = false;
    },
    setClosingAnimation() {
      this.closing = true;
    }
  },
  getters: {
    isClosing(): boolean {
      return this.closing ?? false;
    }
  }
});

export default useModal;