<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';
import ThemeButton from './theme-button.vue';

defineOptions({ name: 'SiteHeader' });

const links = [
  { label: 'Projects', to: '/projects' },
  { label: 'Resume', to: '/resume' },
];

const scrolled = ref(false);

function onScroll() {
  scrolled.value = window.scrollY > 10;
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener('scroll', onScroll));
</script>

<template>
  <header class="site-header">
    <div class="header-bg" :class="{ scrolled }" />
    <div class="nav">
      <RouterLink
        to="/"
        class="logo"
      >
        ht
      </RouterLink>
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
  @apply sticky top-0 z-10;
}

.header-bg {
  position: absolute;
  inset: 0;
  bottom: -4rem;
  pointer-events: none;
  backdrop-filter: blur(0px);
  background: transparent;
  -webkit-mask-image: linear-gradient(to bottom, black 30%, transparent 100%);
  mask-image: linear-gradient(to bottom, black 30%, transparent 100%);
  transition: backdrop-filter 300ms, background 300ms;
  z-index: -1;
}

.header-bg.scrolled {
  backdrop-filter: blur(10px);
  background: linear-gradient(to bottom, rgb(255 255 255 / 0.85) 0%, transparent 100%);
}

:global(.dark .header-bg.scrolled) {
  background: linear-gradient(to bottom, rgb(0 0 0 / 0.75) 0%, transparent 100%);
}

.nav {
  @apply container mx-auto flex max-w-[40em] items-center justify-between py-3 px-4 w640:px-0;
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
