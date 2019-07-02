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
  },
  {
    path: 'account',
    name: 'account',
    component: () => import('pages/UserAccount.vue')
  }
]

const routes = [
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('pages/Login.vue'),
        meta: {
          requires_auth: false
        }
      }
      // {
      //   path: '',
      //   name: 'oauth2',
      //   component: () => import('pages/OAuth2.vue'),
      //   meta: {
      //     requires_auth: false
      //   }
      // },
      // {
      //   path: 'registration',
      //   name: 'registration',
      //   component: () => import('pages/Registration.vue')
      // },
      // {
      //   path: 'login',
      //   name: 'login'
      // },
      // {
      //   path: 'logout',
      //   name: 'logout'
      // }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/BaseLayout.vue'),
    children: main_routes
  },
  {
    path: '/game',
    component: () => import('layouts/BaseLayout.vue'),
    children: [
      {
        name: 'game',
        path: ':game_id',
        component: () => import('pages/Game.vue')
      }
    ]
  },
  {
    path: '/profile',
    component: () => import('layouts/UserLayout.vue'),
    children: user_routes
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export {
  main_routes,
  user_routes
}

export default routes
