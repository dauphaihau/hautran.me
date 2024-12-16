<script setup lang="ts">
import { Icon } from '@iconify/vue';
import resume from '../../../resume.json';
import { toIcon } from '../../utils/toIcon.ts';
import Accomplish from './Accomplish.vue';
import RangeDate from './RangeDate.vue';
</script>

<template>
  <section>
    <div class="space-y-12 card">
      <div class="wrapper">
        <h4 class="title">About</h4>
        <div class="content">
          <p class="">{{ resume.basics.summary }}</p>
        </div>
      </div>
      <div class="wrapper">
        <h4 class="title">Projects</h4>
        <div class="content grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
              v-for="(project, idx) of resume.projects"
              :key="idx"
          >
            <div class="space-y-1">
              <div class="flex items-center gap-3">
                <h3 class="primary-label">{{ project.name }}</h3>
                <div class="flex gap-x-3 items-center py-1">
                  <a :href="project.source" target="_blank">
                    <Icon
                        :icon="toIcon('gitHub')"
                        class="size-4"
                    />
                  </a>
                  <a :href="project.website" target="_blank">
                    <Icon
                        :icon="toIcon('website')"
                        class="size-4"
                    />
                  </a>
                </div>
              </div>
              <div class="text-primary-light text-sm">{{ project.summary }}</div>
              <div class="text-[13px] flex flex-wrap items-center gap-1.5">
                <div v-for="(tech, idx) of project.mainTechnologies" :key="idx">
                  <div class="flex items-center gap-1.5">
                    {{ tech }}
                    <Icon
                        v-if="project.mainTechnologies[idx + 1]"
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

      <div class="wrapper">
        <h4 class="title">Work Experience</h4>
        <div class="content space-y-8">
          <div v-for="(item, idx) of resume.work" :key="idx">
            <div class="space-y-1">
              <div class="flex flex-col md:flex-row justify-between gap-x-2">
                <a
                    :href="item.website"
                    class="text-primary-deeper font-bold"
                    target="_blank"
                >
                  {{ item.company }}
                </a>
                <RangeDate :start-date="item.startDate" :end-date="item.endDate"/>
              </div>
              <div class="text-sm font-medium text-primary-light">{{ item.position }}</div>
              <div v-for="highlight in item.highlights" :key="highlight">
                <Accomplish :text="highlight"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="wrapper">
        <h4 class="title">Knowledge</h4>
        <div class="content space-y-4">
          <div v-for="(item, idx) of resume.skills" :key="idx">
            <div v-if="item.keywords.length > 0" class="flex flex-col gap-x-2">
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
        <h4 class="title">Education</h4>
        <div class="content">
          <div v-for="(item, idx) of resume.education" :key="idx">
            <div class="space-y-1">
              <div class="flex flex-col md:flex-row justify-between gap-x-2">
                <p class="primary-label">{{ item.institution }}</p>
                <RangeDate :start-date="item.startDate" :end-date="item.endDate"/>
              </div>
              <div v-for="cert in item.certifications" :key="cert">
                <Accomplish :text="cert"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
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
