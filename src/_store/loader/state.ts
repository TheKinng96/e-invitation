import { LoaderStore } from '.';
import { PiniaState } from '../piniaTypes';

function checkDeviceWidth(): string {
  if (window.innerWidth <= 768) {
    return 'is-mobile';
  } else if (window.innerWidth < 1025) {
    return 'is-tablet';
  } else {
    return 'is-desktop';
  }
}

export const state: PiniaState<LoaderStore> = () => {
  return {
    device: checkDeviceWidth(),
  };
};
