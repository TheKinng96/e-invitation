<script lang="ts" setup>
import pb from '@/services/pb';
import { UsersResponse } from '@/_types/pocketbase-types';

const props = defineProps<{
  user: UsersResponse;
  width?: number;
}>();

const getCapitalAlphabets = (): string => {
  let nameArray = props.user.name.split(' ');

  // Name that has two or more letters
  if (nameArray.length > 2) {
    return [nameArray[0], nameArray[1]].map((name) => name[0]).join('+');
  }

  return nameArray[0].slice(0, 2).split('').join('+');
};
</script>

<template>
  <div class="image" :style="`max-width: ${props.width}px;`">
    <img
      v-if="user.avatar"
      :src="pb.getFileUrl(user, user.avatar)"
      :alt="`${user.name}'s avatar'`"
    />
    <img
      v-else
      :src="`https://ui-avatars.com/api/?name=${getCapitalAlphabets()}`"
      :alt="`${user.name}'s avatar'`"
    />
  </div>
</template>

<style lang="scss" scoped>
.image {
  aspect-ratio: 1;
  max-width: 40px;
  border-radius: 50%;
  overflow: hidden;
  width: 10rem;

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
