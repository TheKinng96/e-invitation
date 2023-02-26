<script setup lang="ts">
const deadline = new Date('2023-05-06').toLocaleString('en-US', {
  timeZone: 'Asia/Singapore',
});
</script>

<template>
  <div class="hero-container">
    <v-container class="wrapper">
      <div>
        <h3 class="has-text-centered">Days until the big day</h3>
        <vue3-flip-countdown :deadlineDate="deadline" class="clock" />
      </div>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
.hero-container {
  width: 100vw;
  height: calc(100svh - 64px);
  background: url('https://gen-wedding-images.s3.ap-northeast-1.amazonaws.com/DSCF7411.JPG');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    color: white;
    height: 100%;
    padding-bottom: 20vh;

    > div {
      height: max-content;
      padding: 1rem;
      background-color: rgba(black, 0.5);
      border-radius: 1rem;
      width: 100%;

      :deep(.clock) span {
        color: white;
      }
    }
  }
}
</style>
