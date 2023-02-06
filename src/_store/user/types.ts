import { IUser } from '@/_types/user.type';
import { PiniaStateTree } from '../piniaTypes';

export interface UserState extends PiniaStateTree {
  token: string | null;
  user: IUser;
  email: string | null;
  authorizationStatus: boolean;
  userStatus: string;
  authenticationStatus: boolean;
  platform: string;
  userType: string;
}

export interface ILogin {
  expires?: number;
  status?: string;
  token?: string;
  type?: string;
  user: IUser;
}
