<script lang="ts" async setup>
import pb from '@/services/pb';
import { ref, onMounted } from 'vue';
import { useUser } from '@/_store/user';

interface IImage {
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  image_link: string;
  title: string;
  updated: string;
  user: string;
  expand?: any;
  aspect_ratio: string;
}
const fileInput = ref();
const addPhoto = () => {
  fileInput.value.click();
};

const user = useUser();
const imageContainer = ref();

// fetch a paginated records list
const images = ref<Array<any>>([]);
const updatedAt = ref<number>(new Date().getTime());

onMounted(async () => {
  updateImageList();
});

const updateImageList = async () => {
  const resultList = await pb.collection('images').getList(1, 10, {});
  if (resultList.items.length > 0) {
    images.value = resultList.items.map((image) => {
      const url = pb.getFileUrl(image, image.image, { thumb: '0x200' });
      return {
        ...image,
        image_link: url,
      };
    });
  }

  updatedAt.value = new Date().getTime();
};

const onImageUploaded = async (event: any) => {
  let formData = new FormData();
  const file = event.target.files[0];

  // Get image aspect ratio
  let dimensions = new Image();
  let aspectRatio = '';
  dimensions.src = URL.createObjectURL(file);
  dimensions.onload = function () {
    let { width, height }: any = this;

    if (width > height) {
      aspectRatio = `${width / height} / 1`;
    } else {
      aspectRatio = `1 / ${height / width}`;
    }
  };

  formData.append('image', file);
  formData.append(
    'image_link',
    'https://gen-wedding-images.s3.ap-northeast-1.amazonaws.com/G3ND0925.JPG',
  );
  formData.append('user', user.getUser.id);
  formData.append('title', 'image-name');
  formData.append('aspect_ratio', aspectRatio);

  await pb.collection('images').create(formData);
  updateImageList();
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
        <img :src="image.image_link" :key="updatedAt" />
      </div>
      <button @click="addPhoto()" class="add-button">Add Photo</button>
    </v-container>
    <button class="show-more">Show more</button>
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
