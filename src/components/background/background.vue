<script setup lang="ts">
import { computed } from 'vue';
import type { Resume } from '../../data/resume.ts';
import Accomplish from './accomplish.vue';
import ProjectSection from './project-section.vue';
import RangeDate from './range-date.vue';

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

const props = defineProps<{
  resume: Resume
}>();

const experimentalApps = computed<ResumeProject[]>(() => props.resume.projects.experimentalApps);
const devTools = computed<ResumeProject[]>(() => props.resume.projects.devTools);
</script>

<template>
  <section>
    <div class="space-y-12 card">
      <div class="wrapper">
        <h4 class="title">
          About
        </h4>
        <div class="content">
          <p class="">
            {{ resume.basics.summary }}
          </p>
        </div>
      </div>

      <div class="wrapper">
        <h4 class="title">
          Work Experience
        </h4>
        <div class="content space-y-8">
          <div
            v-for="(item, idx) of resume.work"
            :key="idx"
          >
            <div class="space-y-1">
              <div class="flex flex-col md:flex-row justify-between gap-x-2">
                <a
                  :href="item.website"
                  class="text-primary-deeper font-bold"
                  target="_blank"
                >
                  {{ item.company }}
                </a>
                <RangeDate
                  :start-date="item.startDate"
                  :end-date="item.endDate"
                />
              </div>
              <div class="text-sm font-medium text-primary-light">
                {{ item.position }}
              </div>
              <div
                v-for="highlight in item.highlights"
                :key="highlight"
              >
                <Accomplish :text="highlight" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="wrapper">
        <h4 class="title">
          Projects
        </h4>
        <div class="content space-y-12">
          <ProjectSection
            label="Experimental Apps"
            :projects="experimentalApps"
          />
          <ProjectSection
            label="Dev Tools"
            :projects="devTools"
          />
        </div>
      </div>

      <div class="wrapper">
        <h4 class="title">
          Knowledge
        </h4>
        <div class="content space-y-4">
          <div
            v-for="(item, idx) of resume.skills"
            :key="idx"
          >
            <div
              v-if="item.keywords.length > 0"
              class="flex flex-col gap-x-2"
            >
              <div class="primary-label">
                {{ item.name }}:
              </div>
              <div>
                {{ item.keywords.join(', ') }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="wrapper">
        <h4 class="title">
          Education
        </h4>
        <div class="content">
          <div
            v-for="(item, idx) of resume.education"
            :key="idx"
          >
            <div class="space-y-1">
              <div class="flex flex-col md:flex-row justify-between gap-x-2">
                <p class="primary-label">
                  {{ item.institution }}
                </p>
                <RangeDate
                  :start-date="item.startDate"
                  :end-date="item.endDate"
                />
              </div>
              <div
                v-for="cert in item.certifications"
                :key="cert"
              >
                <Accomplish :text="cert" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference "../../index.css";

.wrapper {
  @apply text-left space-y-4;
}

.wrapper .title {
  @apply bg-black dark:bg-white
  pl-1 pr-3.5 w-fit
  text-white dark:text-black font-bold
}

.content {
  @apply md:pl-5
}

.content .primary-label {
  @apply font-bold text-primary-deeper;
}
</style>
