<script lang="ts" setup>
import { onMounted } from 'vue';
import Modal from './messages/Modal.vue';
import useModal from '@/_store/modal';
import useMessage from '@/_store/message';
import { MessagesResponse, UsersResponse } from '@/_types/pocketbase-types';
import MessageCard from './messages/MessageCard.vue';

const messageStore = useMessage();
const modal = useModal();

onMounted(async () => {
  await messageStore.loadMessages();
});

const openModal = (message: MessagesResponse<{ user: UsersResponse }>) => {
  modal.open({
    view: Modal,
    removeCancelButton: true,
    props: {
      currentMessage: message,
    },
  });
};
</script>

<template>
  <div class="wrapper">
    <v-container v-if="messageStore.getMessages.length > 0">
      <h2 class="mb-4">Wishes Board</h2>

      <div class="cards-container">
        <div class="cards-wrapper">
          <MessageCard
            v-for="message in messageStore.getMessages"
            @click="openModal(message)"
            :message="message"
          />
        </div>
      </div>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  background-color: #e3e8f8;
}

.cards-container {
  overflow-x: scroll;
  overflow-y: visible;
}

.cards-wrapper {
  display: flex;
  width: max-content;
  gap: 1rem;
}
</style>
