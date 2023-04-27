import { defineStore } from "pinia";
import pb from '@/services/pb';
import { Collections, UsersResponse } from '@/_types/pocketbase-types';
import { Nullable } from '@/_types/common';

export type UserState = {
  user: UsersResponse,
};

export interface ILogin {
  email: string;
  password: string;
}

export const useUser = defineStore("user", {
  state: (): UserState => ({
    user: {} as UsersResponse,
  }),
  actions: {
    checkUser() {
      if (localStorage.getItem('pocketbase_auth') !== null) {
        let { model } = JSON.parse(localStorage.getItem('pocketbase_auth') as string);
        this.user = model;
      }
    },
    async logUserIn({ email, password }: ILogin) {
      let result;
      try {
        result = await pb
          .collection(Collections.Users)
          .authWithPassword<UsersResponse>(email, password);
      } catch (err) {
        throw new Error;
      }

      let { record } = result;
      this.user = record;
    },

    logUserOut(): boolean {
      this.user = {} as UsersResponse;
      // Clear local storage
      pb.authStore.clear();
      return true;
    },
  },
  getters: {
    getUser(): UsersResponse {
      return this.user;
    },
    getUserId(): string {
      return this.user?.id ?? '';
    }
  }
});

export default useUser;