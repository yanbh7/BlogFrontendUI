// Define your routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/home.vue'),
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import('@/views/About.vue'),
  // },
  // {
  //   path: '/blog/:id',
  //   name: 'BlogDetail',
  //   component: () => import('@/views/BlogDetail.vue'),
  //   props: true,
  // },
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'NotFound',
  //   component: () => import('@/views/NotFound.vue'),
  // },
];

export default routes;
