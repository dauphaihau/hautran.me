<script setup lang="ts">
import { computed } from 'vue';
import type { ResumeWork } from '~/shared/api/resume/dto.ts';

const props = defineProps<{
  items: ResumeWork[]
}>();

const workItems = computed(() => props.items.map(item => ({
  ...item,
  displayDate: `${item.startDate} – ${item.isCurrentRole ? 'Present' : item.endDate}`,
  summary: item.position || item.highlights[0] || item.location,
})));
</script>

<template>
  <div class="wrapper">
    <h4 class="title">
      Work Experience
    </h4>

    <div class="work-list">
      <a
        v-for="item in workItems"
        :key="`${item.company}-${item.startDate}`"
        :href="item.website"
        target="_blank"
        class="work-row"
      >
        <div class="work-main">
          <span class="work-company">{{ item.company }}</span>
          <span
            v-if="item.summary"
            class="work-summary"
          >
            <span class="work-dash">—</span><span>{{ item.summary }}</span>
          </span>
        </div>
        <div class="work-date">
          {{ item.displayDate }}
        </div>
      </a>
    </div>
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

.work-list {
  @apply w768:pl-5;
}

.work-row {
  @apply flex flex-col gap-0.5 no-underline text-sm
         w640:flex-row w640:items-center w640:justify-between w640:gap-4 w640:text-base
         w768:text-[0.9rem];
}

.work-main {
  @apply min-w-0 leading-7;
}

.work-company {
  @apply font-bold text-primary-deeper;
}

.work-summary {
  @apply ml-3 text-primary-light;
}

.work-dash {
  @apply mr-3;
}

.work-date {
  @apply shrink-0 text-primary-light;
}
</style>
