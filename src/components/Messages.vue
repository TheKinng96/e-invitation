<script lang="ts" setup>
import pb from '@/services/pb';
import Avatar from '@/shared/components/Avatar.vue';
import { IUser } from '@/_types/user.type';
import { ref, onMounted } from 'vue';
import moment from 'moment';

export interface IMessage {
  user: string;
  collectionId: string;
  collectionName: string;
  created: string;
  expand: {
    user: IUser;
  };
  id: string;
  text: string;
  updated: string;
}

const messages = ref();

onMounted(async () => {
  const records = await pb.collection('messages').getList(1, 50, {
    sort: 'created',
    expand: 'user',
  });
  messages.value = records.items;
});
</script>

<template>
  <div class="wrapper">
    <v-container v-if="messages">
      <h2 class="mb-4">Wishes Board</h2>

      <div class="cards-container">
        <div class="cards-wrapper">
          <div class="message-card" v-for="message in messages">
            <div class="header">
              <Avatar :user="message.expand.user" />
              <span>{{ message.expand.user.name }}</span>
            </div>
            <div class="content-wrapper">
              <div class="content" v-html="message.text"></div>
            </div>
            <div class="message-card-footer">
              <span>{{ moment(message.updated).fromNow() }}</span>
            </div>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
.content-wrapper {
  width: 100%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
  background: #fff;
}

.wrapper {
  background-color: #e3e8f8;
}

.cards-container {
  overflow-x: scroll;
}

.cards-wrapper {
  display: flex;
  width: max-content;
  gap: 1rem;

  .message-card {
    width: 250px;
    max-height: 300px;
    padding: 0.5rem 1rem;
    background: white;
    border-radius: 4px;

    .header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 1rem;

      span {
        font-size: 1.2rem;
        font-weight: bold;
        font-family: 'Roboto';
      }
    }

    .content {
      font-family: monospace;
      margin: 1rem 0;
    }

    .message-card-footer {
      span {
        color: $color-neutral-400;
        font-size: 0.9em;
      }
    }
  }
}
</style>
