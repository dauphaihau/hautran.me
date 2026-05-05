<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { ResumeProject } from '~/shared/api/resume/dto.ts';
import { toIcon } from '~/shared/utils/to-icon.ts';

defineProps<{ project: ResumeProject }>();
</script>

<template>
  <div class="space-y-1">
    <div class="flex items-center gap-3">
      <h3 class="primary-label">
        {{ project.name }}
      </h3>
      <div class="flex gap-x-3 items-center py-1">
        <a
          v-if="project.webAppUrl"
          :href="project.webAppUrl"
          target="_blank"
        >
          <Icon
            :icon="toIcon('website')"
            class="size-4"
          />
        </a>
        <a
          v-else-if="project.mobileAppUrl"
          :href="project.mobileAppUrl"
          target="_blank"
        >
          <Icon
            :icon="toIcon('app')"
            class="size-4"
          />
        </a>
        <a
          :href="project.sourceUrl"
          target="_blank"
        >
          <Icon
            :icon="toIcon('gitHub')"
            class="size-4"
          />
        </a>
        <a
          v-if="project.npmUrl"
          :href="project.npmUrl"
          target="_blank"
        >
          <Icon
            :icon="toIcon('npm')"
            class="size-4"
          />
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
          <Icon
            v-if="project.mainTechnologies[techIdx + 1]"
            :icon="toIcon('dot')"
            class="size-2"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "../../../app/styles/index.css";

.primary-label {
  @apply font-bold text-primary-deeper;
}
</style>
