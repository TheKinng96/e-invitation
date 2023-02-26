import { IUpdateLocalStorage, LocalStorage } from '@/_types/common';
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
  /**
   * UserType is not a json variable in the localStorage in the old app
   * Because store has not initialized yet, so will need to manually do the checking and replace the value
   **/
  if (
    namespace === LocalStorage.USER_TYPE &&
    typeof localStorage.getItem(namespace) !== 'object'
  ) {
    let user;
    if (localStorage.getItem(LocalStorage.USER)) {
      user = JSON.parse(localStorage.getItem(LocalStorage.USER) as string);
    }
    updateLocalStorage({
      namespace: namespace,
      value: user?.user_type ?? defaultValue,
    });
  }
  return localStorage.getItem(namespace)
    ? JSON.parse(localStorage.getItem(namespace) as string)
    : defaultValue;
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
    isValid: false,
  };
};
