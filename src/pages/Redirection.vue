<script lang="ts" setup>
import pb from '@/services/pb';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const status = ref<'success' | 'failed'>();

onMounted(async () => {
  try {
    console.log(route.query.token);
    await pb
      .collection('users')
      .confirmVerification(route.query.token as string);
    status.value = 'success';

    setTimeout(() => {
      router.push({ name: 'main' });
    }, 1000);
  } catch (error) {
    status.value = 'failed';
  }
});
</script>

<template>
  <div class="redirect columns is-centered">
    <div class="column is-half has-text-centered is-size-1">
      <div>
        <p v-if="status === 'success'">Email verified, redirecting to page</p>
        <p v-else-if="status === 'failed'">
          Could not verified, please re-registered again through the message
          form, redirecting to page
        </p>
        <p v-else>Verifying your email</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
