import { PiniaActions, PiniaActionTree } from '../piniaTypes';
import { UserStore } from '.';
import { ILogin } from './types';
import { IUser, Preferences, UserStatus, Platform } from '@/_types/user.type';
import { LocalStorage, ObjectKey } from '@/_types/common';
import Api from '@/services/api';
import { updateLocalStorage } from '@/_helpers/util';
import { LineAccount } from '@/_types/providers/lineAccount.type';

export interface UserActions extends PiniaActionTree {
  logUserIn(payload: ILogin): void;
  authorizeUser(token: string): void;
  authenticateUser(): void;
  updateUserStatus(status: string): void;
  updateEmail(email: string): void;
  logUserOut(): boolean;
  updatePlan(planId: string): void;
  updatePreferences(preferences: Preferences): void;
  changeWallLoader(): void;
  setUserType(userType: string): void;
  updatePlatform(platform: Platform): void;
  updateLineAccount(lineAccount: LineAccount): void;
  updateUser(user: IUser): void; // Refactor the component
  updateLanguage(language: string): void;
}

export const actions: PiniaActions<UserStore> = {
  logUserIn({ token, status, user }: ILogin) {
    this.email = user.email;

    if (status) {
      if (status === 'completed') {
        updateLocalStorage({
          namespace: LocalStorage.IS_AUTHENTICATED,
          value: true,
        });
        this.authenticationStatus = true;
      }

      this.updateUserStatus(status);
    }

    if (token) {
      this.setToken(token);
    }

    updateLocalStorage({ namespace: LocalStorage.USER, value: user });
    this.user = user;
    this.setUserType(user?.user_type ?? '');

    if (user?.affiliate_user?.skin_feature) {
      this.updateLogo(user.affiliate_user);
    } else {
      // This will be removed once the user theme preferences finished developing
      // this.revertTheme('');
    }
  },

  setToken(token: string) {
    updateLocalStorage({ namespace: LocalStorage.JWT, value: token });
    this.token = token;

    // Authorize User
    updateLocalStorage({
      namespace: LocalStorage.IS_AUTHENTICATED,
      value: true,
    });
    this.authorizationStatus = true;
  },

  authorizeUser(token: string) {
    this.setToken(token);
  },

  authenticateUser() {
    updateLocalStorage({
      namespace: LocalStorage.IS_AUTHENTICATED,
      value: true,
    });
    this.authenticationStatus = true;
  },

  updateUserStatus(status: string) {
    updateLocalStorage({ namespace: LocalStorage.USER_STATUS, value: status });

    // Must have a better way to do this with enum
    let allStatus: ObjectKey = {
      not_verified: UserStatus.NOT_VERIFIED,
      completed: UserStatus.COMPLETED,
      incompleted: UserStatus.INCOMPLETE,
      inactive: UserStatus.INACTIVE,
      deleted: UserStatus.DELETED,
      guest: UserStatus.GUEST,
    };

    this.userStatus = allStatus[status];
  },

  updateEmail(email: string): void {
    updateLocalStorage({ namespace: LocalStorage.EMAIL, value: email });
    this.email = email;
  },

  logUserOut(): boolean {
    // TODO - reset chatbot
    // dispatch('chatbot/resetChatbot', null, { root: true });

    this.userStatus = UserStatus.GUEST;
    this.token = null;
    this.authorizationStatus = false;
    this.email = '';
    this.authenticationStatus = false;
    let user: any = this.user;
    // Clear local storage
    localStorage.clear();
    return true;
  },

  // TODO - see if possible to get from BE for the whole user object
  updatePlan(planId: string): void {
    let user: IUser = this.user;

    user = {
      ...user,
      plan_id: planId,
    };

    if (!user.current_plan_id) {
      let newObject = { current_plan_id: this.user.plan_id };
      Object.assign(user, newObject);
    }

    this.user = user;
  },

  updatePreferences(preferences: Preferences): void {
    Api()
      .put('user/user/preferences', {
        preferences: preferences.name,
        value: preferences.value,
      })
      .then(() => {
        let user: IUser = this.user;

        Object.assign(user, {
          preferences: { ...user.preferences, ...preferences },
        });
        this.user = user;
      });
  },

  changeWallLoader() {
    this.transparentWallLoader = !this.transparentWallLoader;
  },

  setUserType(userType: string) {
    updateLocalStorage({ namespace: LocalStorage.USER_TYPE, value: userType });
    this.userType = userType;
  },

  // Only being used on registration form
  updatePlatform(platform: Platform) {
    this.platform = platform;
  },

  updateLineAccount(lineAccount: LineAccount): void {
    let user: IUser = this.user;

    if (!user.line_account) {
      // Toast here
      return;
    }

    Object.assign(user, { line_account: lineAccount });
    this.user = user;
    updateLocalStorage({ namespace: LocalStorage.USER, value: user });
  },

  updateUser(user: IUser): any {
    this.user = { ...this.user, ...user };
    updateLocalStorage({ namespace: LocalStorage.USER, value: this.user });
  },

  updateLanguage(language: string) {
    this.user = { ...this.user, language: language };
    updateLocalStorage({ namespace: LocalStorage.USER, value: this.user });
  },
};
