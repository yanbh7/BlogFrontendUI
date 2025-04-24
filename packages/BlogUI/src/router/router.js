// Define your routes
const NotFound = () =>
  new Promise((resolve) => {
    import('@blog/common').then(({ NotFoundVue }) => {
      resolve(NotFoundVue);
    });
  });

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/home.vue'),
    children: [
      {
        path: '/blog',
        name: 'blog',
        component: () => import('@/views/blog/blog-detail.vue'),
      },
    ],
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

export default routes;
