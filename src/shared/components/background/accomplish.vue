<script setup lang="ts">
import { toIcon } from '~/shared/utils/to-icon.ts';
import { Icon } from '@iconify/vue';

defineProps<{
  text: string
}>()
</script>

<template>
  <div class="flex items-center w768:ml-3 gap-1.5">
    <div>
      <Icon
        :icon="toIcon('whiteDot')"
        class="size-7"
      />
    </div>
    <p> {{ text }}</p>
  </div>
</template>

<style scoped>

</style>
