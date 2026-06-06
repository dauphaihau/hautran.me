<script setup lang="ts">
import { nextTick, onMounted, provide, ref } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import Header from '~/app/layouts/default/header.vue';
import Footer from '~/app/layouts/default/footer.vue';
import { attachScrambleHover, runScrambleAnimation } from '~/shared/composables/use-scramble-animation.ts';
import { resumeApi } from '~/shared/api/resume/resume.api.ts';
import type { Resume } from '~/shared/api/resume/dto.ts';
import Spinner from '~/shared/components/spinner.vue';

const resume = ref<Resume | null>(null);
const loadError = ref<unknown>(null);
const isLoading = ref(true);
provide('resume', resume);

const router = useRouter();

onMounted(async () => {
  try {
    resume.value = await resumeApi.getDetail();
  }
  catch (error) {
    console.warn(error);
    loadError.value = error;
    return;
  }
  finally {
    isLoading.value = false;
  }

  await nextTick();
  runScrambleAnimation();

  router.afterEach(async () => {
    await nextTick();
    attachScrambleHover();
  });
});
</script>

<template>
  <div
    v-if="resume"
    class="page-root"
  >
    <Header />
    <div class="page-body">
      <main class="flex-1">
        <RouterView />
      </main>
      <Footer :resume="resume" />
    </div>
  </div>
  <main
    v-else-if="isLoading"
    class="loading"
  >
    <Spinner />
  </main>
  <main
    v-else-if="loadError"
    class="wrapper"
  >
    <p>Unable to load resume.</p>
  </main>
</template>

<style scoped>
@reference "./styles/index.css";

.page-root {
  @apply flex flex-col flex-1;
}

.loading {
  @apply flex items-center justify-center flex-1;
}

.page-body {
  @apply container max-w-[40em] mx-auto flex flex-col flex-1 mt-10 px-4 w640:px-0;
}
</style>
