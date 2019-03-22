export const MAIN_ROUTES =
  ['home', 'shop', 'library']
    .map(name => ({
      name,
      path: (name === 'home') ? '/' : `/${ name }`,
      component: () => import(`pages/${ name }`)
    }))

export const GAME_ROUTES = [
  {
    name: 'game-preview',
    path: '/game/:id',
    component: () => import('pages/game/preview')
  }
]

export const USER_ROUTES =
  ['personal', 'account', 'security', 'payments']
    .map(name => ({
      name,
      path: `/user/${ name }`,
      component: () => import(`pages/user/${ name }`)
    }))

export default [
  {
    path: '/',
    component: () => import('layouts/main'),
    children: MAIN_ROUTES.concat(GAME_ROUTES)
  },
  {
    path: '/user',
    component: () => import('layouts/user'),
    children: USER_ROUTES,
    redirect: USER_ROUTES[0].path
  },
  {
    name: '-404',
    path: '*',
    component: () => import('pages/errors/404')
  }
]
