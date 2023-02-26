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
  <div class="invitation-modal" :class="{ closing: modal.isClosing }">
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
  </div>
</template>

<style lang="scss" scoped>
.invitation-modal {
  background: white;
  box-shadow: 0px 2px 8px rgba(34, 41, 149, 0.06),
    0px 4px 16px rgba(34, 41, 149, 0.04);
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 42rem;
  margin: auto;
  padding: 2rem;
  border-radius: 1rem;
  transition: all ease-in-out 0.5s;
  max-height: 100svh;

  &.closing {
    transform: translateY(-50%);
    opacity: 0;
  }

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
}
</style>
