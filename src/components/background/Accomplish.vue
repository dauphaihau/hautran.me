<script setup lang="ts">
import { toIcon } from '../../utils/toIcon.ts';
import { Icon } from '@iconify/vue';

defineProps<{
  text: string
}>()
</script>

<template>
  <div class="flex items-center md:ml-3 gap-1.5">
    <div>
      <Icon :icon="toIcon('whiteDot')" class="size-7"/>
    </div>
    <p> {{ text }}</p>
  </div>
</template>

<style scoped>

</style>
