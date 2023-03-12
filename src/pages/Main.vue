<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import {
  Hero,
  Gallery,
  Locations,
  Modal as InvitationModal,
  Quotes,
  RSVP,
  Support,
  Navbar,
} from '@/components';
import useModal from '@/_store/modal';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const modal = useModal();

onMounted(() => {
  modal.open({
    view: InvitationModal,
    outsideClick: false,
    removeCancelButton: true,
  });
});
</script>

<template>
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

    <!-- Form RESP -->
    <RSVP />

    <!-- Button to support with gift -->
  </v-main>
</template>
