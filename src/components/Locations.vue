<script setup lang="ts">
const locations = [
  {
    time: 'morning',
    area: 'Cukai, Kemaman, Terengganu',
    style: 'Malaysian Chinese Wedding',
    mapLink: 'https://goo.gl/maps/YvcUAmPaqp7SoDkC9',
  },
  {
    time: 'night',
    area: 'Kuantan, Pahang',
    style: 'Party',
    mapLink: 'https://goo.gl/maps/mkKeiJdt6QgfpcnR7',
  },
];
</script>

<template>
  <div class="box-container">
    <span>Location</span>
    <v-container class="locations-container">
      <div class="location-box" v-for="location in locations">
        <h3>{{ location.area }}</h3>
      </div>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
.box-container {
  background-color: #203562;
  padding: 2rem 0;

  > span {
    text-align: center;
    color: white;
    width: 100%;
    font-size: 3rem;
    display: block;
  }

  .locations-container {
    display: flex;
  }

  .location-box {
    background: rgba(255, 255, 255, 0.31);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
}
</style>
