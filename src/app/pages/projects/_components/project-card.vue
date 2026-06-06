<script setup lang="ts">
import type { ResumeProject } from '~/shared/api/resume/dto.ts';
import AppIcon from '~/shared/components/app-icon/index.vue';

defineProps<{ project: ResumeProject }>();
</script>

<template>
  <div class="space-y-1">
    <div class="flex flex-wrap items-center gap-x-3 gap-y-1">
      <h3 class="primary-label">
        {{ project.name }}
      </h3>
      <div class="flex gap-x-3 items-center py-1">
        <a
          v-if="project.webAppUrl"
          :href="project.webAppUrl"
          target="_blank"
        >
          <AppIcon name="website" />
        </a>
        <a
          v-else-if="project.mobileAppUrl"
          :href="project.mobileAppUrl"
          target="_blank"
        >
          <AppIcon name="app" />
        </a>
        <a
          v-if="project.apiUrl"
          :href="project.apiUrl"
          target="_blank"
        >
          <AppIcon name="api" />
        </a>
        <a
          :href="project.sourceUrl"
          target="_blank"
        >
          <AppIcon name="gitHub" />
        </a>
        <a
          v-if="project.npmUrl"
          :href="project.npmUrl"
          target="_blank"
        >
          <AppIcon name="npm" />
        </a>
      </div>
    </div>
    <div class="text-primary-light text-sm">
      {{ project.summary }}
    </div>
    <div class="text-[13px] flex flex-wrap items-center gap-1.5">
      <div
        v-for="(tech, techIdx) of project.mainTechnologies"
        :key="techIdx"
      >
        <div class="flex items-center gap-1.5">
          <span>{{ tech }}</span>
          <AppIcon
            v-if="project.mainTechnologies[techIdx + 1]"
            name="dot"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "../../../styles/index.css";

.primary-label {
  @apply font-bold text-primary-deeper;
}
</style>
