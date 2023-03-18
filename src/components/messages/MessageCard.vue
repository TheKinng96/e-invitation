<script lang="ts" setup>
import { MessagesResponse, UsersResponse } from '@/_types/pocketbase-types';
import moment from 'moment';
import Avatar from '@/shared/components/Avatar.vue';

defineProps<{
  message: MessagesResponse<{ user: UsersResponse }>;
  hasDateTimeOnHeader?: boolean;
}>();
</script>

<template>
  <div class="message-card" :class="{ twitter: hasDateTimeOnHeader }">
    <div class="header">
      <Avatar :user="message?.expand?.user" v-if="message?.expand?.user" />
      <span v-if="!hasDateTimeOnHeader">{{ message?.expand?.user.name }}</span>
    </div>
    <div class="content-wrapper">
      <div class="user-header" v-if="hasDateTimeOnHeader">
        <span class="username">{{ message?.expand?.user.name }}</span>
        <span class="date">{{ moment(message.updated).fromNow() }}</span>
      </div>
      <div class="text-wrapper">
        <div class="content" v-html="message.text"></div>
      </div>

      <div class="message-card-footer" v-if="!hasDateTimeOnHeader">
        <span>{{ moment(message.updated).fromNow() }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.message-card {
  width: 250px;
  max-height: 300px;
  padding: 0.5rem 1rem;
  background: white;
  border-radius: 4px;
  cursor: zoom-in;
  display: flex;
  flex-direction: column;

  &:hover {
    @include box-shadow-3;
  }

  &.twitter {
    flex-direction: row;
    gap: 1rem;

    .header {
      align-items: flex-start;
    }
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
  }

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
    width: 100%;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 8;
    -webkit-box-orient: vertical;
    background: #fff;
  }

  .message-card-footer {
    span {
      color: $color-neutral-400;
      font-size: 0.9em;
    }
  }
}

.user-header {
  display: flex;
  gap: 1rem;
  align-items: center;

  .username {
    font-size: 1.2rem;
    font-weight: bold;
    font-family: 'Roboto';
  }

  .date {
    color: $color-neutral-400;
    font-size: 0.9em;
  }
}
</style>
