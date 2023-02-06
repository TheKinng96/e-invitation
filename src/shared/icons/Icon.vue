<script lang="ts">
import { defineAsyncComponent } from 'vue';

export default {
  name: 'Icon',
  props: {
    icon: {
      type: String,
      required: true,
    },
    src: {
      type: String,
    },
    type: {
      type: String,
    },
  },

  computed: {
    dynamicComponent() {
      const name = this.$props.icon;
      const folder = this.src ?? '';

      return defineAsyncComponent(
        () => import(`./components/${folder}/${name}.svg?component`),
      );
    },
  },
};
</script>

<template>
  <component :is="dynamicComponent" :class="type ?? ''"></component>
</template>

<style lang="scss" scoped>
// Filter value convertor - https://codepen.io/sosuke/pen/Pjoqqp

.primary {
  filter: invert(29%) sepia(100%) saturate(2730%) hue-rotate(229deg)
    brightness(86%) contrast(92%);
}

.grey {
  filter: invert(70%) sepia(16%) saturate(519%) hue-rotate(199deg)
    brightness(85%) contrast(84%);
}
</style>
