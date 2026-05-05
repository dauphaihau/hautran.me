import type { Resume } from './dto.ts';

export const resumeApi = {
  async getDetail(): Promise<Resume> {
    const url = new URL(import.meta.env.VITE_RESUME_URL);
    url.searchParams.set('t', Date.now().toString());

    const response = await fetch(url.toString(), {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to load resume: ${response.status}`);
    }

    return await response.json() as Resume;
  },
};