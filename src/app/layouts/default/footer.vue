<script setup lang="ts">
import { computed } from 'vue';
import type { Resume } from '~/shared/api/resume/dto.ts';
import AppIcon from '~/shared/components/app-icon/index.vue';
import { toIconKey } from '~/shared/components/app-icon/icon-registry.ts';

defineOptions({ name: 'SiteFooter' });

const props = defineProps<{
  resume: Resume
}>();

const profileItems = computed(() =>
  props.resume.basics.profiles.flatMap((item) => {
    const iconKey = toIconKey(item.network);

    return iconKey ? [{ ...item, iconKey }] : [];
  })
);
</script>

<template>
  <footer class="footer">
    <div class="footer-divider" data-scramble-fade />
    <div class="footer-content">
      <div class="footer-links">
        <a
          v-for="item in profileItems"
          :key="item.url"
          :href="item.url"
          target="_blank"
          class="text-primary-light"
        >
          <AppIcon
            :name="item.iconKey"
            size="lg"
          />
        </a>
      </div>
      <div>
        © {{ new Date().getFullYear() }} {{ props.resume.basics.name }}
      </div>
    </div>
  </footer>
</template>

<style scoped>
@reference "../../styles/index.css";

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
