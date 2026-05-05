<script setup lang="ts">
import { useResume } from '~/shared/composables/use-resume.ts';
import ProjectsContent from '~/modules/project/components/projects-content.vue';

const resume = useResume();
</script>

<template>
  <div class="content">
    <ProjectsContent :resume="resume" />
  </div>
</template>
