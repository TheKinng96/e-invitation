<script lang="ts" setup></script>

<template>
  <div class="wrapper">
    <v-card class="content">
      <slot />
    </v-card>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  background-color: #f6f6f6;

  .content {
    margin: 2rem auto;
    max-width: max-content;
  }
}
</style>
