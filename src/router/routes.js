export const mainChildren = [
  {
    name: 'home',
    path: '/',
    component: () => import('pages/home')
  },
  {
    name: 'shop',
    path: '/shop',
    component: () => import('pages/shop')
  },
  {
    name: 'library',
    path: '/library',
    component: () => import('pages/library')
  }
]

export default [
  {
    path: '/',
    component: () => import('layouts/main'),
    children: mainChildren.concat([
      {
        name: 'game',
        path: '/game/:id',
        component: () => import('pages/game')
      }
    ])
  },
  {
    name: '-404',
    path: '*',
    component: () => import('pages/errors/404')
  }
]
