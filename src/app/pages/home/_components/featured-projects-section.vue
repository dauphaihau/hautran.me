<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import type { ResumeProject } from '~/shared/api/resume/dto.ts';

const props = defineProps<{
  projects: ResumeProject[]
}>();

const featuredProjects = computed(() => props.projects.filter(project => project.featured));

function getProjectUrl(project: ResumeProject): string {
  return project.webAppUrl ?? project.mobileAppUrl ?? project.npmUrl ?? project.sourceUrl;
}
</script>

<template>
  <div
    v-if="featuredProjects.length > 0"
    class="featured-projects"
  >
    <div class="heading-row">
      <h4 class="heading">
        Featured Projects
      </h4>
      <RouterLink
        to="/projects"
        class="see-more"
      >
        See more
      </RouterLink>
    </div>

    <div class="project-grid">
      <a
        v-for="project in featuredProjects"
        :key="project.name"
        :href="getProjectUrl(project)"
        target="_blank"
        class="project-card"
      >
        <h5 class="project-title">
          {{ project.name }}
        </h5>
        <p class="project-summary">
          {{ project.summary }}
        </p>
      </a>
    </div>
  </div>
</template>

<style scoped>
@reference "../../../styles/index.css";

.featured-projects {
  @apply space-y-6;
}

.heading-row {
  @apply flex items-center justify-between gap-4;
}

.heading {
  @apply bg-black dark:bg-white
  pl-1 pr-3.5 w-fit
  text-white dark:text-black font-bold;
}

.see-more {
  @apply no-underline text-sm font-medium text-primary-light transition-colors hover:text-primary-deeper;
}

.project-grid {
  @apply grid grid-cols-1 gap-y-4 w768:pl-6;
}

.project-card {
  @apply block no-underline;
}

.project-title {
  @apply text-primary-deeper font-semibold;
}

.project-summary {
  @apply text-sm leading-5 text-primary-light;
}
</style>
