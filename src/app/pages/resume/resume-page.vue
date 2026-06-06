<script setup lang="ts">
import { useResume } from '~/shared/composables/use-resume.ts';
import Accomplish from '~/app/pages/resume/_components/accomplish.vue';
import RangeDate from '~/app/pages/resume/_components/range-date.vue';

const resume = useResume();
</script>

<template>
  <div class="content">
    <section>
      <div class="space-y-12 card">
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
                <div class="flex flex-col gap-y-0.5 w768:flex-row w768:gap-y-0 justify-between gap-x-2">
                  <a
                    :href="item.website"
                    class="text-primary-deeper font-bold"
                    target="_blank"
                  >
                    <span>{{ item.company }}</span>
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
            Knowledge
          </h4>
          <div class="content">
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
                <div class="flex flex-col gap-y-0.5 w768:flex-row w768:gap-y-0 justify-between gap-x-2">
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
  </div>
</template>

<style scoped>
@reference "../../styles/index.css";

.wrapper {
  @apply text-left space-y-4;
}

.wrapper .title {
  @apply bg-black dark:bg-white
  pl-1 pr-3.5 w-fit
  text-white dark:text-black font-bold
}

.content {
  @apply w768:pl-5
}

.content .primary-label {
  @apply font-bold text-primary-deeper;
}
</style>
