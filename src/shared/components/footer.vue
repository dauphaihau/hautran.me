<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { Resume } from '~/shared/api/resume/dto.ts';
import { toIcon, type IconKey } from '~/shared/utils/to-icon.ts';

defineOptions({ name: 'SiteFooter' });

defineProps<{
  resume: Resume
}>();
</script>

<template>
  <footer class="footer">
    <div class="footer-divider" data-scramble-fade />
    <div class="footer-content">
      <div class="footer-links">
        <a
          v-for="item in resume.basics.profiles"
          :key="item.url"
          :href="item.url"
          target="_blank"
          class="text-primary-light"
        >
          <Icon
            :icon="toIcon(item.network as IconKey)"
            class="size-5"
          />
        </a>
      </div>
      <div>
        © {{ new Date().getFullYear() }} {{ resume.basics.name }}
      </div>
    </div>
  </footer>
</template>

<style scoped>
@reference "../../app/styles/index.css";

.footer {
  @apply pb-4;
}

.footer-divider {
  @apply mb-4 border-t border-black/10 dark:border-white/10;
}

.footer-content {
  @apply flex flex-col gap-4 text-center w768:flex-row w768:items-center w768:justify-between w768:text-left;
}

.footer-links {
  @apply flex items-center justify-center gap-5 w768:justify-start;
}
</style>