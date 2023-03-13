<script lang="ts" setup>
import { IUser } from '@/_types/user.type';
import { ref, onMounted } from 'vue';
import 'vue-advanced-cropper/dist/style.css';

const props = defineProps<{
  user: IUser;
}>();
const backgroundColor = ref<string>();

onMounted(() => {
  backgroundColor.value = generateRandomColor(props.user.name);
});

const getCapitalAlphabets = (): string => {
  let nameArray = props.user.name.split(' ');

  // Name that has two or more letters
  if (nameArray.length > 2) {
    return [nameArray[0], nameArray[1]].map((name) => name[0]).join('');
  }

  return nameArray[0].slice(0, 2);
};

const textColor = (bgColor: any) => {
  let r = bgColor.r * 255,
    g = bgColor.g * 255,
    b = bgColor.b * 255;
  let yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? 'black' : 'white';
};

const generateRandomColor = (text: string): string => {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    colour += ('00' + value.toString(16)).slice(-2);
  }
  return colour;
};
</script>

<template>
  <div class="image" :style="`background-color: ${backgroundColor}`">
    <img
      v-if="user.avatar"
      :src="user.avatar"
      :alt="`${user.name}'s avatar'`"
    />
    <span
      v-else
      :style="`color: ${textColor(backgroundColor)}`"
      :class="{ 'is-white': textColor(backgroundColor) === 'white' }"
      >{{ getCapitalAlphabets() }}</span
    >
  </div>
</template>

<style lang="scss" scoped>
.image {
  aspect-ratio: 1;
  max-width: 278px;
  border-radius: 50%;
  overflow: hidden;

  span {
    display: flex;
    width: 100%;
    height: 100%;
    text-transform: uppercase;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: clamp(2rem, 10vw, 6rem);

    &.is-white {
      text-shadow: 1px 1px 1px $color-black;
    }
  }
}
</style>
