export interface ObjectKey {
  [key: string]: any;
}

export enum LocalStorage {
  IS_AUTHENTICATED = 'authenticationStatus',
  USER = 'user',
  JWT = 'jwt',
  USER_STATUS = 'userStatus',
  EMAIL = 'email',
  USER_TYPE = 'userType'
}

export interface IUpdateLocalStorage {
  namespace: LocalStorage;
  value: any;
}