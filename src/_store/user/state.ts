import { IUser } from '@/_types/user.type';
import { UserStore } from '.';
import { PiniaState } from '../piniaTypes';

/**
 * To sync the data in localstorage when user login back
 * @param namespace
 * @param defaultValue
 * @returns null | string | object | boolean
 */
export function syncLocalStorage(namespace: string, defaultValue: any): any {
  if (typeof localStorage.getItem(namespace) === undefined) {
    return defaultValue;
  }

  return JSON.parse(localStorage.getItem(namespace) as string);
}

export const state: PiniaState<UserStore> = () => {
  return {
    user: null,
    token: '',
  };
};
