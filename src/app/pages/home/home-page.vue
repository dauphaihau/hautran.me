<script setup lang="ts">
import { computed } from 'vue';
import { useResume } from '~/shared/composables/use-resume.ts';
import ResumeHeader from '~/app/pages/home/_components/resume-header.vue';
import type { ResumeProject } from '~/shared/api/resume/dto.ts';
import FeaturedProjectsSection from './_components/featured-projects-section.vue';
import WorkExperienceSection from './_components/work-experience-section.vue';

const resume = useResume();

function getVisibleProjects(projects?: ResumeProject[] | null): ResumeProject[] {
  return (projects ?? []).filter(project => project.visible !== false);
}

const allProjects = computed<ResumeProject[]>(() => [
  ...getVisibleProjects(resume.value.projects?.experimentalApps),
  ...getVisibleProjects(resume.value.projects?.devTools),
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
@reference "../../styles/index.css";

.wrapper {
  @apply text-left space-y-4;
}
</style>
