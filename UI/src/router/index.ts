import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'view1',
      component: () => import('../views/ViewOne.vue'),
    },
    {
      path: '/view2',
      name: 'view2',
      component: () => import('../views/ViewTwo.vue'),
    },
  ],
});

export default router;
