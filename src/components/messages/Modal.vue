<script lang="ts" setup>
import { MessagesResponse, UsersResponse } from '@/_types/pocketbase-types';
import useMessage from '@/_store/message';
import MessageCard from './MessageCard.vue';
import { ref } from 'vue';

const messageStore = useMessage();

const props = defineProps<{
  currentMessage: MessagesResponse<{ user: UsersResponse }>;
}>();

const displayMessage = ref<MessagesResponse<{ user: UsersResponse }>>(
  props.currentMessage,
);

const updateMessage = (message: MessagesResponse<{ user: UsersResponse }>) => {
  displayMessage.value = message;
};
</script>

<template>
  <div class="card-wrapper">
    <MessageCard
      :message="displayMessage"
      class="modal-message current"
      :has-date-time-on-header="true"
    />

    <div class="other-cards">
      <template v-for="message in messageStore.getMessages">
        <MessageCard
          v-if="message.id !== displayMessage.id"
          :message="message"
          class="modal-message bottom"
          :has-date-time-on-header="true"
          @click="updateMessage(message)"
        />
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-message {
  flex-direction: column;
  cursor: pointer;

  &.bottom {
    :deep(.content) {
      -webkit-line-clamp: 2;
    }
  }

  &.current {
    width: 100%;
    cursor: auto;

    &:hover {
      box-shadow: unset;
    }
  }
}

.other-cards {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid $color-neutral-300;
}

.card-wrapper {
  width: 100%;
}
</style>
