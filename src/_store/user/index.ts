import { UserState } from './types';
import { defineStore, Store, StoreDefinition } from 'pinia';
import { state } from './state';
import { UserActions, actions } from './actions';
import { UserGetters, getters } from './getters';

// https://github.com/vuejs/pinia/issues/802#issuecomment-1107925251
export type UserStore = Store<'user', UserState, UserGetters, UserActions>;
export type UserStoreDefinition = StoreDefinition<'user', UserState, UserGetters, UserActions>;

export const useUser: UserStoreDefinition = defineStore('user', { state, getters, actions });