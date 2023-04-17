import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'view1',
      component: () => import('../views/View1.vue'),
    },
    {
      path: '/view2',
      name: 'view2',
      component: () => import('../views/View2.vue'),
    },
  ],
});

export default router;
