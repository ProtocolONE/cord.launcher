const components = [
  ['base-title', () => import('components/base/Title')],
  ['base-paragraph', () => import('components/base/Paragraph')],
  ['base-tag', () => import('components/base/Tag')]
]

export default ({ Vue }) => {
  for (let [name, component] of components) {
    Vue.component(name, component)
  }
}
