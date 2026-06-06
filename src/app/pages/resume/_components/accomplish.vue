<script setup lang="ts">
import AppIcon from '~/shared/components/app-icon/index.vue';

defineProps<{
  text: string
}>()
</script>

<template>
  <div class="flex items-center w768:ml-3 gap-1.5">
    <div>
      <AppIcon name="whiteDot" />
    </div>
    <p> {{ text }}</p>
  </div>
</template>

<style scoped>

</style>
