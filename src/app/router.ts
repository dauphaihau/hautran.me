import { createRouter, createWebHistory } from 'vue-router';
import ResumePage from '~/app/pages/resume/resume-page.vue';
import HomePage from '~/app/pages/home/home-page.vue';
import ProjectsPage from '~/app/pages/projects/projects-page.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsPage,
    },
    {
      path: '/resume',
      name: 'resume',
      component: ResumePage,
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
