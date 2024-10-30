<script setup lang="ts">
import Profile from './components/Profile.vue';
import Background from './components/Background.vue';
import resume from '../resume.json';
</script>

<template>
  <div class="wrapper">
    <div class="content">
      <Profile/>
      <Background class="max-w-[50em]"/>
    </div>
    <footer class="text-center mt-10">
      <div class="border-t w-72 mx-auto mb-4"/>
      <div>
        © {{ new Date().getFullYear() }} {{resume.basics.name}}
      </div>
    </footer>
  </div>
</template>

<style scoped>
.wrapper {
  @apply container mx-auto p-2 md:p-8;
}

.content {
  @apply lg:grid
  before:content-[''] before:table
  after:content-[''] after:table
  after:clear-both;
  grid-template-columns: auto 15fr 50fr auto;
}
</style>
