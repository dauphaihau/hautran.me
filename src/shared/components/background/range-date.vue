<script setup lang="ts">

defineProps<{
  startDate: string
  endDate: string
}>()
</script>

<template>
  <div class="flex gap-x-1 text-primary-light font-medium text-sm">
    <div class="">
      {{ startDate }}
    </div>
    <span>-</span>
    <div class="">
      {{ endDate }}
    </div>
  </div>
</template>

<style scoped>

</style>
