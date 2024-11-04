<script setup lang="ts">
import { Icon } from '@iconify/vue';
import resume from '../../resume.json';
import { toIcon } from '../utils/toIcon';
</script>

<template>
  <section>
    <div class="wrapper-card">
      <div class="space-y-12 card">
        <div class="wrapper">
          <div class="title">About</div>
          <div class="content">
            <p class="">{{ resume.basics.summary }}</p>
          </div>
        </div>

        <div class="wrapper">
          <div class="title">Projects</div>
          <div class="content grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
                v-for="(project, idx) of resume.projects"
                :key="idx"
            >
              <div class="space-y-1">
                <div class="flex items-center gap-3">
                  <h3 class="font-bold text-md text-primary-deeper">{{ project.name }}</h3>
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
                <div class="text-sm flex flex-wrap items-center gap-1.5">
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
          <div class="title">Work Experience</div>
          <div class="content space-y-8">
            <div v-for="(item, idx) of resume.work" :key="idx">
              <div class="space-y-1">
                <div class="flex justify-between gap-x-2">
                  <a :href="item.website" class="text-primary-deeper font-bold text-md" target="_blank">{{
                      item.company
                    }}</a>
                  <div class="flex gap-x-1 text-primary-light font-medium text-sm">
                    <div class="">{{ item.startDate }}</div>
                    -
                    <div class="">{{ item.endDate }}</div>
                  </div>
                </div>
                <div class="text-sm font-medium text-primary-light">{{ item.position }}</div>
                <div v-for="highlight in item.highlights" :key="highlight">
                  <div class="flex items-center md:ml-3 gap-1.5">
                    <div>
                      <Icon :icon="toIcon('whiteDot')" class="size-7"/>
                    </div>
                    <p> {{ highlight }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="wrapper">
          <div class="title">Stacks</div>
          <div class="content space-y-4">
            <div v-for="(stack, idx) of resume.skills" :key="idx">
              <div v-if="stack.keywords.length > 0" class="flex gap-x-2">
                <div class="font-bold text-md text-primary-deeper">
                  {{ stack.name }}:
                </div>
                <div>
                  {{ stack.keywords.join(', ') }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="wrapper">
          <div class="title">Education</div>
          <div class="content">
            <div v-for="(item, idx) of resume.education" :key="idx">
              <div class="space-y-1">
                <div class="flex justify-between gap-x-2">
                  <p class="font-bold text-md text-primary-deeper">{{ item.institution }}</p>
                  <div class="flex gap-x-1 text-primary-light font-medium text-sm">
                    <div class="">{{ item.startDate }}</div>
                    -
                    <div class="">{{ item.endDate }}</div>
                  </div>
                </div>
<!--                <p class="font-medium">Certifications: </p>-->
                <div v-for="cert in item.certifications" :key="cert">
                  <div class="flex items-center ml-3">
                    <div>
                      <Icon :icon="toIcon('whiteDot')" class="size-7"/>
                    </div>
                    <p> {{ cert }}</p>
                  </div>
                </div>
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

.content {
  @apply md:pl-5
}

.title {
  @apply bg-black dark:bg-white
  pl-1 pr-3.5 w-fit
  text-white dark:text-black font-bold
}
</style>
