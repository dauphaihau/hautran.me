<script setup lang="ts">
import { computed } from 'vue';
import ContentSection from '~/app/components/content-section.vue';
import { useResume } from '~/shared/composables/use-resume.ts';
import type { ResumeProject } from '~/shared/api/resume/dto.ts';
import ProjectSection from './_components/project-section.vue';

const resume = useResume();

function getVisibleProjects(projects?: ResumeProject[] | null): ResumeProject[] {
  return (projects ?? []).filter(project => project.visible !== false);
}

const experimentalApps = computed<ResumeProject[]>(() => getVisibleProjects(resume.value.projects?.experimentalApps));
const devTools = computed<ResumeProject[]>(() => getVisibleProjects(resume.value.projects?.devTools));
</script>

<template>
  <div class="content">
    <section class="card">
      <ContentSection
        title="Projects"
        content-class="space-y-12"
      >
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
      </ContentSection>
    </section>
  </div>
</template>
