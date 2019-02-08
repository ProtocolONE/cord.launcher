export const navigationLinks = [
  { name: 'home', path: '/' },
  { name: 'shop', path: '/shop' },
  { name: 'library', path: '/library' }
]

const mainPages = navigationLinks.map(link => {
  let componentName = link.name.replace(/^\w/, c => c.toUpperCase())
  link.component = () => import(`pages/main/${ componentName }`)
  return link
})

const nestedPages = [
  {
    name: 'game',
    path: '/game/:id',
    component: () => import('pages/nested/Game')
  }
]

const errorPages = [
  {
    name: '404',
    path: '*',
    component: () => import('pages/errors/Error404.vue')
  }
]

export default [
  ...mainPages,
  ...nestedPages,
  ...errorPages
]
