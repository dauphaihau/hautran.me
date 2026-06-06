<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import { defaultIconSize, icons, type IconKey } from '~/shared/components/app-icon/icon-registry.ts';

defineOptions({ name: 'AppIcon' });

const props = defineProps<{
  name: IconKey
  size?: 'sm' | 'md' | 'lg' | 'xl'
}>();

const sizeClassByKey = {
  sm: 'size-2',
  md: 'size-4',
  lg: 'size-5',
  xl: 'size-7',
} as const;

const iconName = computed(() => icons[props.name]);
const sizeClass = computed(() => sizeClassByKey[props.size ?? defaultIconSize[props.name]]);
</script>

<template>
  <Icon
    :icon="iconName"
    :class="sizeClass"
  />
</template>
