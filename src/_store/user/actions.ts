import { PiniaActions, PiniaActionTree } from '../piniaTypes';
import { UserStore } from '.';
import { ILogin } from './types';
import { IUser } from '@/_types/user.type';
import { LocalStorage } from '@/_types/common';
import { updateLocalStorage } from './state';

export interface UserActions extends PiniaActionTree {
  logUserIn(payload: ILogin): void;
  logUserOut(): boolean;
}

export const actions: PiniaActions<UserStore> = {
  logUserIn({ isValid, token, model: user }: ILogin) {
    this.user = user;
    this.token = (token);
    this.isValid = isValid;

    updateLocalStorage({ namespace: LocalStorage.USER, value: user });
    updateLocalStorage({ namespace: LocalStorage.JWT, value: token });
    updateLocalStorage({ namespace: LocalStorage.IS_AUTHENTICATED, value: isValid });
  },

  logUserOut(): boolean {
    this.user = {} as IUser;
    let user: any = this.user;
    // Clear local storage
    localStorage.clear();
    return true;
  },
};
