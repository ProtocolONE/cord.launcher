const routes = [
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        name: 'auth',
        component: () => import('pages/Auth.vue')
      },
      {
        path: 'registration',
        component: () => import('pages/Registration.vue')
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/BaseLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/Home.vue')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
