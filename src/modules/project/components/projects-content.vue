<script setup lang="ts">
import { computed } from 'vue';
import ProjectSection from '~/shared/components/background/project-section.vue';
import type { Resume, ResumeProject } from '~/shared/api/resume/dto.ts';

const props = defineProps<{ resume: Resume }>();

function getVisibleProjects(projects?: ResumeProject[] | null): ResumeProject[] {
  return (projects ?? []).filter(project => project.visible !== false);
}

const experimentalApps = computed<ResumeProject[]>(() => getVisibleProjects(props.resume.projects.experimentalApps));
const devTools = computed<ResumeProject[]>(() => getVisibleProjects(props.resume.projects.devTools));
</script>

<template>
  <section class="card">
    <div class="wrapper">
      <h4 class="title">
        Projects
      </h4>
      <div class="content space-y-12">
        <ProjectSection
          v-if="experimentalApps.length > 0"
          label="Experimental Apps"
          :projects="experimentalApps"
        />
        <ProjectSection
          v-if="devTools.length > 0"
          label="Dev Tools"
          :projects="devTools"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference "../../../app/styles/index.css";

.wrapper {
  @apply text-left space-y-4;
}

.wrapper .title {
  @apply bg-black dark:bg-white
  pl-1 pr-3.5 w-fit
  text-white dark:text-black font-bold;
}

.content {
  @apply w768:pl-5;
}
</style>
