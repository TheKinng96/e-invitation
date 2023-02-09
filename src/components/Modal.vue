<script lang="ts" setup></script>

<template>
  <div class="invitation-modal">
    <h1>Wedding Invitation</h1>
    <div class="img-container">
      <img src="@/assets/img/image-1.jpg" alt="cover-img" />
    </div>
    <h2>Dear friends</h2>
    <p>
      With great joy, we are pleased to cordially invite you to celebrate the
      marriage of
    </p>
    <span>Gen & Hoyi</span>

    <v-btn> Open Invitation </v-btn>
  </div>
</template>

<style lang="scss" scoped>
.invitation-modal {
  background: white;
  box-shadow: 0px 2px 8px rgba(34, 41, 149, 0.06),
    0px 4px 16px rgba(34, 41, 149, 0.04);

  .img-container {
    width: 300px;
    height: 300px;
    overflow: hidden;
  }
}
</style>
