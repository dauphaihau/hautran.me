<script setup lang="ts">
import { useResume } from '~/shared/composables/use-resume.ts';
import HomeContent from '~/modules/home/components/home-content.vue';

const resume = useResume();
</script>

<template>
  <HomeContent :resume="resume" />
</template>
