<script setup lang="ts">
import { useResume } from '~/shared/composables/use-resume.ts';
import ContentSection from '~/app/components/content-section.vue';
import Accomplish from '~/app/pages/resume/_components/accomplish.vue';
import RangeDate from '~/app/pages/resume/_components/range-date.vue';

const resume = useResume();
</script>

<template>
  <div class="content">
    <section>
      <div class="space-y-12 card">
        <ContentSection
          title="Work Experience"
          content-class="space-y-8"
        >
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
        </ContentSection>

        <ContentSection
          title="Knowledge"
          content-class="space-y-4"
        >
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
        </ContentSection>

        <ContentSection title="Education">
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
        </ContentSection>
      </div>
    </section>
  </div>
</template>

<style scoped>
@reference "../../styles/index.css";

.content .primary-label {
  @apply font-bold text-primary-deeper;
}
</style>
