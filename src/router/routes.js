const main_routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('pages/Home')
  },
  {
    name: 'shop',
    path: '/shop',
    component: () => import('pages/Shop')
  },
  {
    name: 'library',
    path: '/library',
    component: () => import('pages/Library')
  },
  {
    name: 'auth-web-form-example',
    path: '/auth-web-form-example',
    component: () => import('pages/AuthWebFormExample')
  }
]

const user_routes = [
  {
    path: '',
    name: 'personal',
    component: () => import('pages/UserPersonal')
  },
  {
    path: 'account',
    name: 'account',
    component: () => import('pages/UserAccount')
  }
]

const routes = [
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout'),
    children: [
      {
        path: '',
        name: 'oauth2',
        component: () => import('pages/OAuth2'),
        meta: {
          requires_auth: false
        }
      },
      {
        path: 'registration',
        name: 'registration',
        component: () => import('pages/Registration')
      },
      {
        path: 'login',
        name: 'login'
      },
      {
        path: 'logout',
        name: 'logout'
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/BaseLayout'),
    children: main_routes
  },
  {
    path: '/game',
    component: () => import('layouts/BaseLayout'),
    children: [
      {
        name: 'game',
        path: ':game_id',
        component: () => import('pages/Game')
      }
    ]
  },
  {
    path: '/profile',
    component: () => import('layouts/UserLayout'),
    children: user_routes
  },
  {
    path: '*',
    component: () => import('pages/Error404')
  }
]

export {
  main_routes,
  user_routes
}

export default routes
