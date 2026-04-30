<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import Profile from './components/profile.vue';
import Background from './components/background/background.vue';
import { runScrambleAnimation } from './composables/use-scramble-animation.ts';
import {
  fetchRemoteResume,
  type Resume,
} from './data/resume.ts';

const resume = ref<Resume | null>(null);
const loadError = ref<unknown>(null);

onMounted(async () => {
  try {
    resume.value = await fetchRemoteResume();
  }
  catch (error) {
    console.warn(error);
    loadError.value = error;
    return;
  }

  await nextTick();
  runScrambleAnimation();
});
</script>

<template>
  <div
    v-if="resume"
    class="wrapper"
  >
    <div class="content">
      <Profile :resume="resume" />
      <Background
        :resume="resume"
        class="max-w-[50em]"
      />
    </div>
    <footer class="text-center mt-10">
      <div class="border-t w-72 mx-auto mb-4" />
      <div>
        © {{ new Date().getFullYear() }} {{ resume.basics.name }}
      </div>
    </footer>
  </div>
  <main
    v-else-if="loadError"
    class="wrapper"
  >
    <p>Unable to load resume.</p>
  </main>
</template>

<style scoped>
@reference "./index.css";

.wrapper {
  @apply container max-w-5xl mx-auto p-2 md:p-8;
}

.content {
  @apply lg:grid
  before:content-[''] before:table
  after:content-[''] after:table
  after:clear-both;
  grid-template-columns: auto 15fr 50fr auto;
}
</style>
