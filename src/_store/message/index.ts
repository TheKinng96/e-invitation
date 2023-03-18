
import { defineStore } from "pinia";
import pb from '@/services/pb';
import { Collections, MessagesResponse, UsersResponse } from '@/_types/pocketbase-types';

export type MessageState = {
  messages: MessagesResponse<{ user: UsersResponse; }>[];
  readPage: number;
  totalPages: number;
};

export const useMessage = defineStore("message", {
  state: (): MessageState => ({
    messages: [],
    readPage: 1,
    totalPages: 1,
  }),
  actions: {
    async loadMessages() {
      if (this.readPage <= this.totalPages) {
        const result = await pb.collection(Collections.Messages).getList<MessagesResponse<{ user: UsersResponse; }>>(this.readPage, 50, {
          sort: 'created',
          expand: 'user',
        });
        this.messages = [...result.items];
        this.totalPages = result.totalPages;
        this.readPage++;
      }
    }
  },
  getters: {
    getMessages(): MessagesResponse<{ user: UsersResponse; }>[] {
      return this.messages;
    }
  }
});

export default useMessage;