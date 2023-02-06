
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
  }),
  actions: {
    open(modalData: Modal) {
      this.props = modalData.props;
      this.isOpen = true;
      this.outsideClick = modalData.outsideClick ?? true;
      this.actions = modalData.actions;
      this.removeCancelButton = modalData.removeCancelButton ?? false;
      // Using markRaw to avoid over performance as reactive is not required
      this.view = markRaw(modalData.view);
    },
    close() {
      this.isOpen = false;
      this.view = {};
      this.actions = [];
    },
  },
});

export default useModal;