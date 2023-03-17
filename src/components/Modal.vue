<script lang="ts" setup>
import useModal from '@/_store/modal';

const modal = useModal();
const close = () => {
  modal.setClosingAnimation();
  setTimeout(() => {
    modal.close();
  }, 500);
};
</script>

<template>
  <h2><span>W</span>edding <span>I</span>nvitation</h2>
  <div class="img-container">
    <img src="@/assets/img/image-2.jpg" alt="cover-img" />
  </div>
  <h5>Dear friends</h5>
  <p>
    With great joy, we are pleased to cordially invite you to celebrate the
    marriage of
  </p>
  <h1>Gen & Hoyi</h1>

  <v-btn @click="close()" class="primary-btn"> Open Invitation </v-btn>
</template>

<style lang="scss" scoped>
h2 {
  font-size: 2rem;
  text-transform: uppercase;
  font-family: 'Playfair Display';
  letter-spacing: 1px;
  color: $color-primary-900;

  span {
    font-size: 1.3em;
  }
}

h5 {
  font-family: 'Playfair Display';
  color: $color-primary-900;
}

p {
  word-wrap: break-word;
  max-width: 23rem;
  text-align: center;
  margin-top: 1rem;
}

h1 {
  font-family: 'Playfair Display';
  font-size: 1.3rem;
  margin-bottom: 2rem;
  color: $color-primary-900;
}

.img-container {
  width: 300px;
  height: 300px;
  overflow: hidden;
  border-radius: 1rem;
  margin: 2rem;
}
</style>
