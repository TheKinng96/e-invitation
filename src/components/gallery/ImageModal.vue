<script lang="ts" setup>
import {
  Collections,
  ImagesResponse,
  IsoDateString,
  RecordIdString,
  UsersResponse,
} from '@/_types/pocketbase-types';
import pb from '@/services/pb';
import Avatar from '@/shared/components/Avatar.vue';

interface IImageModal extends ImagesResponse<UsersResponse> {
  user: RecordIdString;
  title?: string;
  aspect_ratio?: string;
  height?: number;
  image: string;
  expand: any;
  id: RecordIdString;
  created: IsoDateString;
  updated: IsoDateString;
  collectionId: string;
  collectionName: Collections;
}
const props = defineProps<IImageModal>();
</script>

<template>
  <div class="wrapper">
    <div class="image-container">
      <img :src="pb.getFileUrl(props, props.image)" :alt="props.image" />
    </div>

    <div class="information-container">
      <div class="user-info">
        <div class="info-header">
          <Avatar :user="props.expand.user" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  min-height: 80svh;
  display: flex;

  .image-container {
    padding: 1rem;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .information-container {
  }
}
</style>
