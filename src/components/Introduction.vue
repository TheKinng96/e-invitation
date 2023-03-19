<script lang="ts" setup></script>

<template>
  <div class="wrapper">
    <v-container>
      <h4>The Couple</h4>

      <div class="intro-cards-wrapper">
        <div class="intro-card">
          <div class="img-container">
            <img
              src="https://gen-wedding-images.s3.ap-northeast-1.amazonaws.com/DSCF9618.jpg"
              alt="gen"
            />
          </div>
        </div>

        <div class="intro-card">
          <div class="img-container">
            <img
              src="https://gen-wedding-images.s3.ap-northeast-1.amazonaws.com/DSCF0644-2.jpg"
              alt="hoyi"
            />
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  background-color: #3e588f;
  color: white;
}

.intro-cards-wrapper {
  display: flex;

  .intro-card {
    .img-container {
      max-width: 20rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
