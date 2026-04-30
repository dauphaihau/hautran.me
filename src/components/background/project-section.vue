<script setup lang="ts">
import ProjectCard from './project-card.vue';

type ResumeProject = {
  name: string
  summary: string
  technologies: string
  mainTechnologies: string[]
  source: string
  npm?: string
  website?: string
  app?: string
};

defineProps<{
  label: string
  projects: ResumeProject[]
}>();
</script>

<template>
  <div class="space-y-4">
    <h5 class="section-label">
      {{ label }}
    </h5>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
      <ProjectCard
        v-for="(project, idx) of projects"
        :key="idx"
        :project="project"
      />
    </div>
  </div>
</template>

<style scoped>
@reference "../../index.css";

.section-label {
  @apply text-sm font-semibold uppercase tracking-[0.12em] text-primary-light;
}
</style>
