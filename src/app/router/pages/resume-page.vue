<script setup lang="ts">
import Background from '~/modules/resume/components/background.vue';
import { useResume } from '~/shared/composables/use-resume.ts';

const resume = useResume();
</script>

<template>
  <div class="content">
    <Background :resume="resume" />
  </div>
</template>
