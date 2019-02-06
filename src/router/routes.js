export const pages = [
  { name: 'home', path: '/', component: 'Home' },
  { name: 'shop', path: '/shop', component: 'Shop' },
  { name: 'library', path: '/library', component: 'Library' }
]

export default [
  ...pages.map(({ name, path, component }) => ({
    name,
    path,
    component: () => import(`pages/${ component }`)
  })),
  {
    name: '404',
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

// Always leave this as last one
// if (process.env.MODE !== 'ssr') {
//   routes.push({
//     path: '*',
//     component: () => import('pages/Error404.vue')
//   })
// }
