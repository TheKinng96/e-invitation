<script lang="ts" setup>
import pb from '@/services/pb';
import Avatar from '@/shared/components/Avatar.vue';
import { IUser } from '@/_types/user.type';
import { ref, onMounted } from 'vue';

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

const messages = ref<IMessage[]>();

onMounted(async () => {
  const records = await pb.collection('messages').getList(1, 50, {
    sort: 'created',
    expand: 'user',
  });
  // messages.value = records.items as IMessage[];
  console.log(records);

  // Idea like a post with avatar header and content
});
</script>

<template>
  <div class="wrapper">
    <v-container>
      <div class="message-card">
        <div class="card-header">
          <!-- <Avatar /> -->
        </div>
      </div>
    </v-container>
  </div>
</template>

<style lang="scss" scoped></style>
