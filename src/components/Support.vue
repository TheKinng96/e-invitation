<script lang="ts" setup></script>

<template>
  <div class="support-section">
    <v-container class="message-block">
      <p>
        Share the love and gift us your support! Your kind contributions will go
        towards our wedding fund and help us make beautiful memories. Click the
        link below to show your support and join us in celebrating this special
        milestone in our lives.
      </p>

      <div class="button-wrapper">
        <button>
          <a href="https://www.buymeacoffee.com/fengyuanyaE">
            Send us gift 🎁
          </a>
        </button>
      </div>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
.support-section {
  background-color: #3e588f;
  color: $color-neutral-100;
  padding: 2rem 0;
  font-size: 1.2rem;
  text-align: center;

  .message-block {
    padding: 1rem;
    border-radius: 4px;
    border: 1px solid $color-neutral-100;
  }

  .button-wrapper {
    margin: 2rem 0;

    button {
      background-color: $color-neutral-100;
      color: #203562;
      padding: 0.5rem 2rem;
      transition: all linear 0.5s;

      &:hover {
        @include box-shadow-3;
        background-color: $color-neutral-300;

        a {
          color: black;
        }
      }
    }
  }
}
</style>
