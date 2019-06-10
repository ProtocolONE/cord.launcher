const main_routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('pages/Home.vue')
  },
  {
    name: 'shop',
    path: '/shop',
    component: () => import('pages/Shop.vue')
  },
  {
    name: 'library',
    path: '/library',
    component: () => import('pages/Library.vue')
  }
]

const routes = [
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        name: 'auth',
        component: () => import('pages/Auth.vue'),
        meta: {
          requires_auth: false
        }
      },
      {
        path: '/logout',
        name: 'logout'
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/BaseLayout.vue'),
    children: main_routes.map(route => {
      route.meta = {
        requires_auth: true
      }
      return route
    })
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export { main_routes }
export default routes
