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

          <div class="info-container">
            <h1>Yap Feng Yuan</h1>
            <div class="social-media-icons">
              <a href="https://www.instagram.com/fengyuan.yap/" target="_blank">
                <Icon icon="instagram" />
              </a>
            </div>
          </div>
        </div>

        <div class="intro-card">
          <div class="img-container">
            <img
              src="https://gen-wedding-images.s3.ap-northeast-1.amazonaws.com/DSCF0644-2.jpg"
              alt="hoyi"
            />
          </div>
          <div class="info-container">
            <h1>Chong Ho Yi</h1>
            <div class="social-media-icons">
              <a href="https://www.instagram.com/fengyuan.yap/" target="_blank">
                <Icon icon="instagram" />
              </a>
            </div>
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
  padding-bottom: 2rem;
}

.intro-cards-wrapper {
  display: flex;
  justify-content: space-around;
  margin-top: 1.5rem;

  .intro-card {
    .img-container {
      max-width: 20rem;
      img {
        border-radius: 4px;
        width: 100%;
        height: 100%;
      }
    }
  }

  .info-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;

    h1 {
      font-size: 2rem;
    }

    .social-media-icons {
      a {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
