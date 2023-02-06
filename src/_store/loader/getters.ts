import { PiniaGetters, PiniaGetterTree } from '../piniaTypes';
import { LoaderStore } from '.';
import { AffiliateUser } from '@/_types/affiliateUser.type';

export interface LoaderGetters extends PiniaGetterTree {
  isMobile(): boolean;
  isTablet(): boolean;
  isDesktop(): boolean;
}

export const getters: PiniaGetters<LoaderStore> = {
  isMobile(): boolean {
    if (this.device === 'is-mobile') {
      return true;
    }
    return false;
  },

  isTablet(): boolean {
    if (this.device === 'is-tablet') {
      return true;
    }
    return false;
  },

  isDesktop(): boolean {
    if (this.device === 'is-desktop') {
      return true;
    }
    return false;
  },
};
