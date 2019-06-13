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

const user_routes = [
  {
    path: '',
    name: 'personal',
    component: () => import('pages/UserPersonal.vue')
  }
]

const routes = [
  {
    path: '/oauth2',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        name: 'oauth2',
        component: () => import('pages/OAuth2.vue'),
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
  },
  {
    path: '/profile',
    component: () => import('layouts/UserLayout.vue'),
    children: user_routes.map(route => {
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

export {
  main_routes,
  user_routes
}

export default routes
