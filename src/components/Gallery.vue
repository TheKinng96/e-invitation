<script lang="ts" async setup>
import pb from '@/services/pb';

interface IImage {
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  image_link: string;
  title: string;
  updated: string;
  user: string;
}

// fetch a paginated records list
const resultList = await pb.collection('images').getList(1, 10, {});
const addPhoto = () => {};
</script>

<template>
  <div class="block-container">
    <v-container>
      <div v-for="item in resultList.items" class="image-container">
        <img :src="item.image_link" alt="item.title" />
        <span>{{ item.title }}</span>
      </div>
    </v-container>
    <button @click="addPhoto">Add Photo</button>
    <button>Show more</button>
  </div>
</template>

<style lang="scss" scoped>
.block-container {
  background-color: #e3e8f8;
  position: relative;
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

button {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: #e3e8f8;
  color: #203562;
  padding: 0.5rem 1rem;
  border-radius: 3rem !important;
  visibility: hidden;
}
</style>
