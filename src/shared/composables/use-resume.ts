import {
  computed, inject, type ComputedRef, type Ref 
} from 'vue';
import type { Resume } from '~/shared/api/resume/dto.ts';

export function useResume(): ComputedRef<Resume> {
  const resume = inject<Ref<Resume | null>>('resume');

  if (!resume) {
    throw new Error('Resume data has not been provided.');
  }

  return computed(() => {
    if (!resume.value) {
      throw new Error('Resume data is not ready.');
    }

    return resume.value;
  });
}
