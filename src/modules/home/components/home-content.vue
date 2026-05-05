<script setup lang="ts">
import { computed } from 'vue';
import ResumeHeader from '~/shared/components/resume-header.vue';
import type { Resume, ResumeProject } from '~/shared/api/resume/dto.ts';
import FeaturedProjectsSection from './featured-projects-section.vue';
import WorkExperienceSection from './work-experience-section.vue';

const props = defineProps<{
  resume: Resume
}>();

function getVisibleProjects(projects?: ResumeProject[] | null): ResumeProject[] {
  return (projects ?? []).filter(project => project.visible !== false);
}

const allProjects = computed<ResumeProject[]>(() => [
  ...getVisibleProjects(props.resume.projects.experimentalApps),
  ...getVisibleProjects(props.resume.projects.devTools),
]);
</script>

<template>
  <div class="content">
    <ResumeHeader :resume="resume" />

    <section class="card space-y-12 !pt-0">
      <div class="wrapper">
        <p>{{ resume.basics.summary }}</p>
      </div>

      <div class="wrapper">
        <WorkExperienceSection :items="resume.work" />
      </div>

      <div class="wrapper">
        <FeaturedProjectsSection :projects="allProjects" />
      </div>
    </section>
  </div>
</template>

<style scoped>
@reference "../../../app/styles/index.css";

.wrapper {
  @apply text-left space-y-4;
}

.title {
  @apply bg-black dark:bg-white
  pl-1 pr-3.5 w-fit
  text-white dark:text-black font-bold;
}

.section-content {
  @apply md:pl-5;
}
</style>
