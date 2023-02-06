import { defineStore } from 'pinia';
import i18n from '@/plugins/i18n';
import { IToast, ToastType, ToastState } from './types';

export const useToast = defineStore('toast', {
  state: (): ToastState => {
    return {
      queue: []
    };
  },
  actions: {
    append(toast?: IToast) {
      let content = {
        id: Date.now().toString(),
        message: toast?.message || i18n.global.t('toast.success').toString(),
        type: toast?.type || ToastType.success,
        duration: toast?.duration || 3000,
        isSnackbar: toast?.isSnackbar,
      };

      this.queue.push(content);
    },
    remove() {
      this.queue.shift();
    }
  },
  getters: {
    getToasts(): IToast[] {
      return this.queue;
    }
  }
});