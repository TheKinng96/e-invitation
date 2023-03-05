<script lang="ts" async setup>
import pb from '@/services/pb';
import ImagesGrid from 'vue-images-grid';
import 'vue-images-grid/dist/style.css';
import { ref, onMounted } from 'vue';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
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
  src?: string;
}
const fileInput = ref();
const addPhoto = () => {
  fileInput.value.click();
};

const user = useUser();

// fetch a paginated records list
const images = ref<Array<any>>([]);
const updatedAt = ref<number>(new Date().getTime());
const secretAccessKey = import.meta.env.VITE_S3_SECRET_KEY;
const accessKeyId = import.meta.env.VITE_S3_ACCESS_KEY;
const bucket = import.meta.env.VITE_S3_BUCKET_NAME;

onMounted(() => {
  updateImageList();
});

const updateImageList = async () => {
  const resultList = await pb.collection('images').getList(1, 10, {});
  if (resultList.items.length > 0) {
    images.value = resultList.items.map((image) => {
      return {
        ...image,
        src: image.image_link,
      };
    });
  }

  updatedAt.value = new Date().getTime();
};

const client = new S3Client({
  region: 'ap-northeast-1',
  credentials: {
    secretAccessKey,
    accessKeyId,
  },
});

const onImageUploaded = async (event: any) => {
  const file = event.target.files[0];
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: file.name,
    Body: file,
  });

  try {
    const response = await client.send(command);
  } catch (err) {
    console.error(err);
  }

  const data = {
    image_link: `https://${bucket}.s3.ap-northeast-1.amazonaws.com/${file.name}`,
    user: user.getUser.id,
    title: 'image-name',
  };

  await pb.collection('images').create(data);
  updateImageList();
};
</script>

<template>
  <div class="block-container">
    <v-container class="wrapper">
      <ImagesGrid
        v-if="images.length > 0"
        :key="updatedAt"
        :cols="4"
        :images="images"
        :image-style="{ width: 'auto', marginBottom: '10px' }"
        :is-responsive="true"
        col-spaces="20px"
        object-fit="cover"
      />
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
  display: grid;
  grid-template-columns: repeat(4, auto);
}

.add-button {
  border: dashed #3e588f 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  transition: all 0.2s linear;

  &:hover {
    background-color: #c0c5cd;
  }
}

.image-container {
  position: relative;

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
