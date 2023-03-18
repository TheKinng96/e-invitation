<script lang="ts">
import axios from 'axios';

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

const downloadImage = async (responseUrl: string) => {
  const link = document.createElement('a');
  link.href = responseUrl;
  link.setAttribute('download', 'file.png'); //or any other extension
  document.body.appendChild(link);
  link.click();
};
</script>

<template>
  <div>
    <transition name="flip">
      <div class="card" :key="'' + flipped">
        <div class="front" v-if="!flipped" @click="flipped = !flipped">
          <div class="header">
            <h5>{{ location.area }}</h5>
            <span>{{ location.ceremonyStyle }}</span>
          </div>
          <div class="table-content">
            <div>
              <h6>Schedule</h6>
              <table>
                <thead>
                  <tr>
                    <th class="table-head-time">Time</th>
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
            <span class="location-footer">
              <Icon icon="waze-icon" type="white" class="location-icon" />
              Waze QR code
            </span>
          </div>
        </div>
        <div class="back" v-else>
          <div class="download-block">
            <div class="image-container">
              <img :src="location.qrCode" alt="waze QR code" />
            </div>

            <button @click="downloadImage(location.qrCode)">Download</button>
          </div>

          <div class="location-footer">
            <button @click="flipped = !flipped">
              <Icon icon="flip-backward" type="neutral" />
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.location-footer {
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all linear 0.25s;

  .location-icon {
    aspect-ratio: 1;
    width: 30px;
    display: block;
  }

  &:hover {
    filter: invert(70%) sepia(16%) saturate(519%) hue-rotate(199deg)
      brightness(85%) contrast(84%);
  }
}

.table-head-time {
  width: 5rem;
}

.table-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  > div {
    width: max-content;
    margin: 0.5rem auto;
  }
}

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
  color: $color-neutral-100;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.31);
  border-radius: 16px;
  position: relative;
  will-change: transform;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  height: 23rem;
  display: block;

  .front {
    cursor: pointer;
  }

  .front,
  .back {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
  }

  .header {
    display: flex;
    flex-direction: column;
    text-align: center;
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid $color-neutral-100;
  }
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
