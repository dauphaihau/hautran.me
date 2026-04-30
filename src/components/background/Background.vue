<script setup lang="ts">
import { Icon } from '@iconify/vue';
import resume from '../../../resume.json';
import { toIcon } from '../../utils/to-icon.ts';
import Accomplish from './Accomplish.vue';
import RangeDate from './RangeDate.vue';

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

const experimentalApps: ResumeProject[] = resume.projects.experimentalApps;
const devTools: ResumeProject[] = resume.projects.devTools;
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
          <div class="space-y-4">
            <h5 class="section-label">
              Experimental Apps
            </h5>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
              <div
                v-for="(project, idx) of experimentalApps"
                :key="idx"
              >
                <div class="space-y-1">
                  <div class="flex items-center gap-3">
                    <h3 class="primary-label">
                      {{ project.name }}
                    </h3>
                    <div class="flex gap-x-3 items-center py-1">
                      <a
                        :href="project.source"
                        target="_blank"
                      >
                        <Icon
                          :icon="toIcon('gitHub')"
                          class="size-4"
                        />
                      </a>
                      <a
                        v-if="project.website"
                        :href="project.website"
                        target="_blank"
                      >
                        <Icon
                          :icon="toIcon('website')"
                          class="size-4"
                        />
                      </a>
                      <a
                        v-else-if="project.app"
                        :href="project.app"
                        target="_blank"
                      >
                        <Icon
                          :icon="toIcon('app')"
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
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <h5 class="section-label">
              Dev Tools
            </h5>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
              <div
                v-for="(project, idx) of devTools"
                :key="idx"
              >
                <div class="space-y-1">
                  <div class="flex items-center gap-3">
                    <h3 class="primary-label">
                      {{ project.name }}
                    </h3>
                    <div class="flex gap-x-3 items-center py-1">
                      <a
                        :href="project.source"
                        target="_blank"
                      >
                        <Icon
                          :icon="toIcon('gitHub')"
                          class="size-4"
                        />
                      </a>
                      <a
                        v-if="project.npm"
                        :href="project.npm"
                        target="_blank"
                      >
                        <Icon
                          :icon="toIcon('npm')"
                          class="size-4"
                        />
                      </a>
                      <a
                        v-if="project.website"
                        :href="project.website"
                        target="_blank"
                      >
                        <Icon
                          :icon="toIcon('website')"
                          class="size-4"
                        />
                      </a>
                      <a
                        v-else-if="project.app"
                        :href="project.app"
                        target="_blank"
                      >
                        <Icon
                          :icon="toIcon('app')"
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
              </div>
            </div>
          </div>
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

.section-label {
  @apply text-sm font-semibold uppercase tracking-[0.12em] text-primary-light;
}
</style>
