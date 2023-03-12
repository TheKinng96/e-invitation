export const authRoute = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/pages/Main.vue'),
  },
  {
    path: '/redirection',
    name: 'redirection',
    component: () => import('@/pages/Redirection.vue'),
  },
];
