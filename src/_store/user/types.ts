import { IUser } from '@/_types/user.type';
import { PiniaStateTree } from '../piniaTypes';

export interface UserState extends PiniaStateTree {
  user: IUser;
  isValid?: boolean;
  token?: string;
}

export interface ILogin {
  isValid: boolean;
  token: string;
  model: IUser;
}
