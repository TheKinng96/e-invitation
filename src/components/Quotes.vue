<script setup lang="ts"></script>

<template>
  <div class="block-container">
    <v-container>
      <p>
        Love is not just about finding the perfect person, it's about choosing
        to spend every day creating a perfect life together.
      </p>
      <h5>
        After 5 years, we decided to make a family and start another chapter of
        the Adventure of Gen and Hoyi.
      </h5>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
.block-container {
  min-height: 250px;
  background-color: #3e588f;
  display: flex;
  align-items: center;
}

p {
  position: relative;
  isolation: isolate;
  font-size: 2rem;
  color: white;

  &::before {
    content: open-quote;
    color: #c0c5cd;
    position: absolute;
    font-size: 15rem;
    font-family: serif;
    font-weight: 900;
    top: -8.5rem;
    left: -2.5rem;
    z-index: -1;
  }
}

h5 {
  margin-top: 3rem;
  color: white;
}
</style>
