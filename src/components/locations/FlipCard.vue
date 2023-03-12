<script lang="ts">
interface IActivity {
  time: string;
  activity: string;
}
</script>

<script lang="ts" async setup>
import { ref } from 'vue';

export interface ILocation {
  time: string;
  area: string;
  ceremonyStyle: string;
  mapLink: string;
  qrCode: string;
  schedule: IActivity[];
}

const location = defineProps<ILocation>();
const flipped = ref(false);
</script>

<template>
  <div @click="flipped = !flipped">
    <transition name="flip">
      <div class="card" :key="'' + flipped">
        <div class="front" v-if="!flipped">
          <div class="card-header">
            <h5>{{ location.area }}</h5>
            <span>{{ location.ceremonyStyle }}</span>
          </div>
          <div>
            <h6>Schedule</h6>
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Activity</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="schedule in location.schedule">
                  <td>{{ schedule.time }}</td>
                  <td>{{ schedule.activity }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          Waze QR code
        </div>
        <div class="back" v-else>
          <div class="image-container">
            <img :src="location.qrCode" alt="waze QR code" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.image-container {
  width: 100%;
  height: 100%;
  padding: 1rem;

  img {
    width: 50%;
    aspect-ratio: 1;
  }
}
.card {
  display: block;
  background: rgba(255, 255, 255, 0.31);
  border-radius: 16px;
  position: relative;
  will-change: transform;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  height: 20rem;
}

.flip-enter-active {
  transition: all 0.4s ease;
}

.flip-leave-active {
  display: none;
}

.flip-enter-from,
.flip-leave-to {
  transform: rotateY(180deg);
  opacity: 0;
}
</style>
