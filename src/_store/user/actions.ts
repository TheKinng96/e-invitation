import { PiniaActions, PiniaActionTree } from '../piniaTypes';
import { UserStore } from '.';
import { ILogin } from './types';
import { IUser } from '@/_types/user.type';
import { LocalStorage } from '@/_types/common';
import { updateLocalStorage } from './state';
import pb from '@/services/pb';

export interface UserActions extends PiniaActionTree {
  logUserIn(payload: ILogin): void;
  logUserOut(): boolean;
}

export const actions: PiniaActions<UserStore> = {
  async logUserIn({ email, password }: ILogin) {
    let result;
    try {
      result = await pb
        .collection('users')
        .authWithPassword(email, password);
    } catch (err) {
      throw new Error;
    }

    let { record: user, token } = result;

    this.user = {
      ...user,
      avatar: `${import.meta.env.VITE_API_URL}/files/${user.collectionName}/${user.id}/${user.avatar}`
    } as IUser;
    this.token = (token);

    updateLocalStorage({ namespace: LocalStorage.USER, value: user });
    updateLocalStorage({ namespace: LocalStorage.JWT, value: token });
  },

  logUserOut(): boolean {
    this.user = {} as IUser;
    let user: any = this.user;
    // Clear local storage
    localStorage.clear();
    return true;
  },
};
