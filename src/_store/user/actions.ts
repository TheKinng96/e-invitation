import { PiniaActions, PiniaActionTree } from '../piniaTypes';
import { UserStore } from '.';
import { ILogin } from './types';
import { IUser } from '@/_types/user.type';
import pb from '@/services/pb';

export interface UserActions extends PiniaActionTree {
  logUserIn(payload: ILogin): void;
  logUserOut(): boolean;
}

export const actions: PiniaActions<UserStore> = {
  checkUser() {
    if (localStorage.getItem('pocketbase_auth') !== null) {
      let { model: user, token } = JSON.parse(localStorage.getItem('pocketbase_auth') as string);
      this.user = {
        ...user,
        avatar: pb.getFileUrl(user, user.avatar)
      } as IUser;
      this.token = token;
    }
  },
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
    console.log(pb.getFileUrl(user, user.avatar));
    this.user = {
      ...user,
      avatar: pb.getFileUrl(user, user.avatar)
    } as IUser;
    this.token = (token);
  },

  logUserOut(): boolean {
    this.user = null;
    // Clear local storage
    pb.authStore.clear();
    return true;
  },
};
