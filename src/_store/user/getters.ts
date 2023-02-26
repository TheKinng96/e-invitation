import { PiniaGetters, PiniaGetterTree } from '../piniaTypes';
import { UserStore } from '.';
import { IUser } from '@/_types/user.type';

export interface UserGetters extends PiniaGetterTree {
  getUser(): IUser;
}

export const getters: PiniaGetters<UserStore> = {
  getUser(): IUser {
    return this.user;
  }
};
