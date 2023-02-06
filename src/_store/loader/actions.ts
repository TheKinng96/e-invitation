import { PiniaActions, PiniaActionTree } from '../piniaTypes';
import { LoaderStore } from '.';

export interface LoaderActions extends PiniaActionTree {
  updateWindow(currentInnerWidth: number): void;
}

export const actions: PiniaActions<LoaderStore> = {
  updateWindow(currentInnerWidth: number) {
    if (currentInnerWidth <= 768) {
      this.device = 'is-mobile';
    } else if (currentInnerWidth < 1025) {
      this.device = 'is-tablet';
    } else {
      this.device = 'is-desktop';
    }
  }
};
