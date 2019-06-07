const components = require.context('components/base', false, /.vue/)

function get_name (kebab_case) {
  return kebab_case
    .split(/(?=[A-Z])/)
    .map(v => v.toLowerCase())
    .join('-')
}

export default ({ Vue }) => {
  components.keys().forEach(data => {
    let component = components(data).default
    Vue.component(get_name(component.name), component)
  })
}
