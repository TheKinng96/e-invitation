<script lang="ts">
import { defineAsyncComponent } from 'vue';

export default {
  name: 'Icon',
  props: {
    icon: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
  },

  computed: {
    dynamicComponent() {
      const name = this.$props.icon;

      return defineAsyncComponent(
        () => import(`./components/common/${name}.svg?component`),
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

.white {
  filter: invert(99%) sepia(85%) saturate(0%) hue-rotate(16deg) brightness(110%)
    contrast(101%);
}

.success {
  filter: invert(59%) sepia(55%) saturate(548%) hue-rotate(95deg)
    brightness(91%) contrast(89%);
}

.error {
  filter: invert(14%) sepia(38%) saturate(6658%) hue-rotate(346deg)
    brightness(90%) contrast(86%);
}

.neutral {
  filter: invert(47%) sepia(10%) saturate(1230%) hue-rotate(198deg)
    brightness(91%) contrast(87%);
}
</style>
