import { IUpdateLocalStorage } from '@/_types/common';
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

/**
 * Update localstorage
 * @param IUpdateLocalStorage
 * @returns void
 */
export function updateLocalStorage({
  namespace,
  value,
}: IUpdateLocalStorage): void {
  localStorage.removeItem(namespace.toString());
  localStorage.setItem(namespace.toString(), JSON.stringify(value));
}

export const state: PiniaState<UserStore> = () => {
  return {
    user: syncLocalStorage('user', {}) as IUser,
    token: '',
  };
};
