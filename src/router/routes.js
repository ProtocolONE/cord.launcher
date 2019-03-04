import navigationList from './navigation-list'
import { replaceFirstChar } from 'utils'

const main = navigationList.map(link => {
  let componentName = replaceFirstChar(link.name, char => char.toUpperCase())
  link.component = () => import(`@/pages/main/${ componentName }`)
  return link
})

const nested = [
  {
    name: 'game',
    path: '/game/:id',
    component: () => import('@/pages/nested/Game')
  },
  {
    name: 'download',
    path: '/download',
    component: () => import('@/pages/nested/Download')
  }
]

const errors = [
  {
    name: '404',
    path: '*',
    component: () => import('@/pages/errors/Error404.vue')
  }
]

export default [...main, ...nested, ...errors]
