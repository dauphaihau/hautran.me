<script setup lang="ts">
import { RouterLink } from 'vue-router';
import ThemeButton from './theme-button.vue';

const links = [
  { label: 'Projects', to: '/projects' },
  { label: 'Resume', to: '/resume' },
];
</script>

<template>
  <header class="site-header">
    <div class="nav">
      <RouterLink to="/" class="logo">ht</RouterLink>
      <nav class="nav-links">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="nav-link"
          active-class="nav-link-active"
          exact-active-class="nav-link-active"
        >
          {{ link.label }}
        </RouterLink>
        <ThemeButton />
      </nav>
    </div>
  </header>
</template>

<style scoped>
@reference "../../app/styles/index.css";

.site-header {
  @apply sticky top-0 z-10 border-b border-black/10 bg-white/85 backdrop-blur dark:border-white/10 dark:bg-black/70;
}

.nav {
  @apply container mx-auto flex max-w-[40em] items-center justify-between py-3;
}

.logo {
  @apply no-underline font-bold tracking-[0.14em] text-primary-deeper;
}

.nav-links {
  @apply flex items-center gap-6;
}

.nav-link {
  @apply no-underline text-sm font-semibold tracking-[0.14em] text-primary-light transition-colors hover:text-primary-deeper;
}

.nav-link-active {
  @apply text-primary-deeper;
}
</style>
