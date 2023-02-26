import { IUser } from '@/_types/user.type';
import { PiniaStateTree } from '../piniaTypes';

export interface UserState extends PiniaStateTree {
  user: IUser;
  token: string;
}

export interface ILogin {
  email: string;
  password: string;
}
