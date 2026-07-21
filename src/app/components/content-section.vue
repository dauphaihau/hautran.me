<script setup lang="ts">
defineProps<{
  title: string
  contentClass?: string
}>();
</script>

<template>
  <div class="content-section">
    <div class="heading-row">
      <h4 class="title">
        {{ title }}
      </h4>

      <slot name="action" />
    </div>

    <div :class="['section-content', contentClass]">
      <slot />
    </div>
  </div>
</template>

<style scoped>
@reference "../styles/index.css";

.content-section {
  @apply text-left space-y-4;
}

.heading-row {
  @apply flex items-center justify-between gap-4;
}

.title {
  @apply bg-black dark:bg-white
  pl-1 pr-3.5 w-fit
  text-white dark:text-black font-bold;
}

.section-content {
  @apply pl-5;
}
</style>
