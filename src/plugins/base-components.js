import BaseTitle from 'components/base/Title'
import BaseParagraph from 'components/base/Paragraph'
import BaseTag from 'components/base/Tag'
import BaseInput from 'components/base/Input'
import BaseSelect from 'components/base/Select'
import BaseButton from 'components/base/Button'
import BaseSearch from 'components/base/Search'

const components = [
  ['base-title', BaseTitle],
  ['base-paragraph', BaseParagraph],
  ['base-tag', BaseTag],
  ['base-input', BaseInput],
  ['base-select', BaseSelect],
  ['base-button', BaseButton],
  ['base-search', BaseSearch]
]

export default ({ Vue }) => {
  for (let [name, component] of components) {
    Vue.component(name, component)
  }
}
