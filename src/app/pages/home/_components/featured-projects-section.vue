<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import ContentSection from '~/app/components/content-section.vue';
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
  <ContentSection
    v-if="featuredProjects.length > 0"
    title="Featured Projects"
  >
    <template #action>
      <RouterLink
        to="/projects"
        class="see-more"
      >
        See more
      </RouterLink>
    </template>

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
  </ContentSection>
</template>

<style scoped>
@reference "../../../styles/index.css";

.see-more {
  @apply no-underline text-sm font-medium text-primary-light transition-colors hover:text-primary-deeper;
}

.project-grid {
  @apply grid grid-cols-1 gap-y-4;
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
