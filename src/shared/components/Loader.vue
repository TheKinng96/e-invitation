<script lang="ts" setup>
withDefaults(
  defineProps<{
    show: boolean;
  }>(),
  {
    show: false,
  },
);
</script>

<template>
  <div class="wrapper" v-if="show">
    <div class="loader"></div>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba($color: #fff, $alpha: 0.6);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .loader {
    position: absolute;
    border: 0.35rem solid #f3f3f3; /* Light grey */
    border-top: 0.35rem solid var(--theme-primary); /* Blue */
    border-radius: 50%;
    opacity: 0.5;
    width: 4rem;
    height: 4rem;
    animation: spin 2s linear infinite;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
