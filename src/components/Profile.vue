<script setup lang="ts">
import { Icon } from '@iconify/vue';
import resume from '../../resume.json';
import { toIcon, IconKey } from '../utils/toIcon.ts';
</script>

<template>
  <section>
    <div class="sticky top-0">
      <div class="card text-left">
        <div>
          <h3 class="text-3xl font-bold text-primary-deeper">{{ resume.basics.name }}</h3>
          <div class="text-primary-light text-nowrap">{{ resume.basics.label }}</div>
        </div>
        <div class="leading-loose mt-2">
          <a
              :href="`mailto:${resume.basics.email}`"
              target="_blank"
              class="text-sm"
          >
            {{ resume.basics.email }}
          </a>
        </div>
        <div class="flex space-x-5 mt-4">
          <div v-for="item in resume.basics.profiles" :key="item.url">
            <a
                :href="item.url"
                target="_blank"
                class="text-primary-light"
            >
              <Icon :icon="toIcon(item.network as IconKey)" class="size-5"/>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
