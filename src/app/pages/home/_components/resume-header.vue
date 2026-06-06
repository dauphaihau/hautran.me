<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import type { Resume } from '~/shared/api/resume/dto.ts';

defineProps<{
  resume: Resume
}>();

const labels = ['Web Developer', 'Software Craftsman', 'Christian'];

const currentIndex = ref(0);
const animating = ref(false);

let timer: ReturnType<typeof setInterval>;

onMounted(() => {
  timer = setInterval(() => {
    animating.value = true;
    setTimeout(() => {
      currentIndex.value = (currentIndex.value + 1) % labels.length;
      animating.value = false;
    }, 300);
  }, 2500);
});

onBeforeUnmount(() => clearInterval(timer));
</script>

<template>
  <section class="card text-left !pb-0">
    <div>
      <h3 class="text-2xl w640:text-3xl font-bold text-primary-deeper">
        {{ resume.basics.name }}
      </h3>
      <div class="label-wrapper">
        <span
          class="label"
          :class="{ 'label-exit': animating }"
        >
          {{ labels[currentIndex] }}
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.label-wrapper {
  overflow: hidden;
  height: 1.5em;
}

.label {
  display: inline-block;
  color: var(--c-light);
  white-space: nowrap;
  animation: flip-up-in 0.3s ease forwards;
}

.label-exit {
  animation: flip-up-out 0.3s ease forwards;
}

@keyframes flip-up-in {
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes flip-up-out {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-100%);
  }
}
</style>
