<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import {
  Hero,
  Gallery,
  Locations,
  Modal as InvitationModal,
  Messages,
  Quotes,
  RSVP,
  Support,
  Navbar,
} from '@/components';
import useModal from '@/_store/modal';
import { useUser } from '@/_store/user';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const modal = useModal();
const user = useUser();

onMounted(() => {
  if (!user.user) {
    modal.open({
      view: InvitationModal,
      outsideClick: false,
      removeCancelButton: true,
    });
  }
});
</script>

<template>
  <Navbar />

  <v-main>
    <!-- Hero and count down -->
    <Hero />

    <!-- Quotes -->
    <Quotes />

    <!-- Gallery about our lives -->
    <Suspense>
      <Gallery />
      <template #fallback> hihi </template>
    </Suspense>

    <!-- Location -->
    <Locations />

    <!-- Messages board -->
    <Messages />

    <!-- Form RESP -->
    <RSVP />

    <!-- Button to support with gift -->
    <Support />

    <footer class="app-footer">
      <p>Build by Gen</p>
    </footer>
  </v-main>
</template>

<style scoped lang="scss">
.app-footer {
  width: 100%;
  padding: 1rem;
  background-color: black;

  p {
    text-align: center;
    color: $color-white;
    font-weight: bold;
    font-family: 'Playfair Display';
  }
}
</style>
