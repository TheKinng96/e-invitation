<script lang="ts" async setup>
import pb from '@/services/pb';
import { useI18n } from 'vue-i18n';
import { ref, onMounted, computed } from 'vue';
import { useUser } from '@/_store/user';
import { useGallery } from '@/_store/gallery';
import { useToast } from '@/_store/toast';
import { ToastType } from '@/_store/toast/types';
import LoginModal from './navbar/LoginModal.vue';
import useModal from '@/_store/modal';

const fileInput = ref();
const toast = useToast();
const { t } = useI18n();
const galleryStore = useGallery();
const userStore = useUser();
const imageContainer = ref();
const modal = useModal();
const images = computed(() => galleryStore.getImages);

const addPhoto = () => {
  if (!userStore.getUserId) {
    toast.append({
      message: t('login_is_required'),
      type: ToastType.warning,
    });
    modal.open({
      view: LoginModal,
    });
    return;
  }
  fileInput.value.click();
};

onMounted(async () => {
  await galleryStore.loadGallery(10);
});

const onImageUploaded = async (event: any) => {
  let userId;
  try {
    userId = userStore.getUser.id;
  } catch ({ message }: any) {
    toast.append({
      message: t(`image_upload_error.please_login`),
      type: ToastType.danger,
    });
    return;
  }

  await uploadImage(event.target.files[0]);
};

const uploadImage = async (file: any) => {
  await galleryStore.uploadImage(file);
};
</script>

<template>
  <div class="block-container">
    <v-container class="wrapper" ref="imageContainer">
      <div
        v-if="images.length > 0"
        v-for="image in images"
        :style="`aspect-ratio: ${image.aspect_ratio};`"
        class="image-container"
        :key="image.id"
      >
        <img
          :src="pb.getFileUrl(image, image.image, { thumb: '0x500' })"
          :alt="image.image"
        />
      </div>
      <button @click="addPhoto()" class="add-button">
        {{ t('gallery.add_photo') }}
      </button>
    </v-container>
    <button class="show-more">{{ t('gallery.show_more') }}</button>
  </div>
  <input
    type="file"
    multiple
    @change="onImageUploaded"
    class="hidden"
    ref="fileInput"
    accept="image/*"
  />
</template>

<style lang="scss" scoped>
.hidden {
  display: none;
}

.block-container {
  background-color: $color-neutral-100;
  position: relative;
}

.wrapper {
  --gap: 0.5em;
  --columns: 4;
  max-width: 60rem;
  margin: 0 auto;
  display: column;
  columns: var(--columns);
  gap: var(--gap);

  > * {
    break-inside: avoid;
    margin-bottom: var(--gap);
  }

  @media screen and (max-width: 500px) {
    --columns: 1;
  }

  @media screen and (max-width: $sm-breakpoint-max) {
    --columns: 2;
  }
}

@supports (grid-template-rows: masonry) {
  .wrapper {
    display: grid;
    grid-template-columns: repeat(var(--columns), 1fr);
    grid-template-rows: masonry;
    grid-auto-flow: dense;

    > * {
      margin-bottom: 0em;
    }
  }
}

.add-button {
  border: dashed #3e588f 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 4rem;
  transition: all 0.2s linear;

  &:hover {
    background-color: #c0c5cd;
  }
}

.image-container {
  position: relative;
  height: max-content;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  span {
    @include box-shadow-2;
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    color: #203562;
    background-color: rgba(#e3e8f8, 0.7);
    padding: 0.5rem 1rem;
    border-radius: 4px;
    border-color: unset;
    opacity: 0;
    transition: all ease-in 0.5s;
  }

  &:hover {
    span {
      opacity: 1;
    }
  }
}

.show-more {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: #e3e8f8;
  color: #203562;
  padding: 0.5rem 1rem;
  border-radius: 3rem !important;
}
</style>
