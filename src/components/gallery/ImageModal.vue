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
import { useI18n } from 'vue-i18n';
import moment from 'moment';

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
const { t } = useI18n();
</script>

<template>
  <div class="wrapper">
    <div class="image-container">
      <img :src="pb.getFileUrl(props, props.image)" :alt="props.image" />
    </div>

    <div class="information-container">
      <div class="user-info">
        <div class="info-header">
          <Avatar :user="props.expand.user" :width="50" />

          <div>
            <p>{{ props.expand.user.name }}</p>
            <span>{{
              t('gallery.posted_at') +
              moment(props.created).format('YYYY-MM-DD')
            }}</span>
          </div>
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
    width: max-content;

    .user-info {
      width: max-content;

      .info-header {
        display: flex;
        gap: 0.5rem;

        > div {
          display: flex;
          flex-direction: column;
          justify-content: center;

          > p {
            text-transform: capitalize;
            font-size: 1.2em;
            color: $color-neutral-800;
            font-weight: bold;
            line-height: 1rem;
          }

          > span {
            font-size: 0.8em;
            color: $color-neutral-300;
          }
        }
      }
    }
  }
}
</style>
