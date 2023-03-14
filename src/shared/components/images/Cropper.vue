<script lang="ts" setup>
import { Cropper, CircleStencil } from 'vue-advanced-cropper';
import { ref } from 'vue';
import 'vue-advanced-cropper/dist/style.css';
import Navigation from './Navigation.vue';

defineProps<{
  image: string;
}>();

const emit = defineEmits(['change']);

const zoom = ref(0);
const imageCropper = ref();

const onChange = (result: any) => {
  const cropper = imageCropper;
  if (cropper) {
    const { coordinates, imageSize } = imageCropper.value;
    if (
      imageSize.width / imageSize.height >
      coordinates.width / coordinates.height
    ) {
      // Determine the position of slider bullet
      // It's 0 if the stencil has the maximum size and it's 1 if the has the minimum size
      zoom.value =
        (imageCropper.value.imageSize.height -
          imageCropper.value.coordinates.height) /
        (imageCropper.value.imageSize.height -
          imageCropper.value.sizeRestrictions.minHeight);
    } else {
      zoom.value =
        (imageCropper.value.imageSize.width -
          imageCropper.value.coordinates.width) /
        (imageCropper.value.imageSize.width -
          imageCropper.value.sizeRestrictions.minWidth);
    }
  }

  emit('change', result.canvas.toDataURL('image/jpg'));
};
const onZoom = (value: any) => {
  const cropper = imageCropper.value;
  if (cropper) {
    if (cropper.imageSize.height < cropper.imageSize.width) {
      const minHeight = cropper.sizeRestrictions.minHeight;
      const imageHeight = cropper.imageSize.height;
      // Determine the current absolute zoom and the new absolute zoom
      // to calculate the sought relative zoom value
      cropper.zoom(
        (imageHeight - zoom.value * (imageHeight - minHeight)) /
          (imageHeight - value * (imageHeight - minHeight)),
      );
    } else {
      const minWidth = cropper.sizeRestrictions.minWidth;
      const imageWidth = cropper.imageSize.width;
      cropper.zoom(
        (imageWidth - zoom.value * (imageWidth - minWidth)) /
          (imageWidth - value * (imageWidth - minWidth)),
      );
    }
  }
};
</script>

<template>
  <div>
    <cropper
      ref="imageCropper"
      class="wrapper"
      image-restriction="stencil"
      :stencil-props="{
        lines: {},
        handlers: {},
        movable: false,
        scalable: false,
        aspectRatio: 1,
      }"
      :stencil-size="{
        width: 278,
        height: 278,
      }"
      :stencil-component="CircleStencil"
      :transitions="false"
      :src="image"
      @change="onChange"
    />
    <Navigation :zoom="zoom" @change="onZoom" />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  max-width: 278px;
  aspect-ratio: 1;
  border-radius: 50%;
  margin: auto;
}
</style>
