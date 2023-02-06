import { syncLocalStorage } from '@/_helpers/util';
import { IUser, UserStatus, UserType } from '@/_types/user.type';
import { UserStore } from '.';
import { PiniaState } from '../piniaTypes';

export const state: PiniaState<UserStore> = () => {
  return {
    token: syncLocalStorage('jwt', null) as string | null,
    email: syncLocalStorage('email', null) as string | null,
    authorizationStatus: syncLocalStorage(
      'authorizationStatus',
      false,
    ) as boolean,
    authenticationStatus: syncLocalStorage(
      'authenticationStatus',
      null,
    ) as boolean,
    userStatus: syncLocalStorage('userStatus', UserStatus.GUEST) as UserStatus,
    userType: syncLocalStorage('userType', UserType.DEFAULT) as UserType,
    user: syncLocalStorage('user', {}) as IUser,
    platform: '',
  };
};
