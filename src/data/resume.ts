/* eslint @typescript-eslint/naming-convention: ["error", { "selector": "typeProperty", "format": ["camelCase", "snake_case"] }] */

export const RESUME_URL = 'https://gist.githubusercontent.com/dauphaihau/efcc9bad54416de44f8c4cceae1ea200/raw/resume.json';

export type ResumeProfile = {
  network: string
  url: string
  username: string
};

export type ResumeSkill = {
  keywords: string[]
  level: string
  name: string
};

export type ResumeProject = {
  name: string
  summary: string
  technologies: string
  mainTechnologies: string[]
  sourceUrl: string
  visible?: boolean
  npmUrl?: string
  webAppUrl?: string
  mobileAppUrl?: string
};

export type ResumeWork = {
  company: string
  position: string
  website: string
  location: string
  isCurrentRole: boolean
  startDate: string
  endDate: string
  highlights: string[]
};

export type ResumeEducation = {
  institution: string
  certifications: string[]
  startDate: string
  endDate: string
};

export type ResumeBasics = {
  name: string
  picture: string
  label: string
  headline: string
  summary: string
  website: string
  address: string
  username: string
  email: string
  profiles: ResumeProfile[]
} & {
  projects_url: string
};

export type Resume = {
  basics: ResumeBasics
  skills: ResumeSkill[]
  projects: {
    experimentalApps?: ResumeProject[] | null
    devTools?: ResumeProject[] | null
  }
  work: ResumeWork[]
  education: ResumeEducation[]
};

export async function fetchRemoteResume(): Promise<Resume> {
  const url = new URL(RESUME_URL);
  url.searchParams.set('t', Date.now().toString());

  const response = await fetch(url.toString(), {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to load resume: ${response.status}`);
  }

  return await response.json() as Resume;
}
