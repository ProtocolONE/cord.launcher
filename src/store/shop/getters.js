import { cloneDeep } from 'lodash-es'

/**
 * Returns the full clone state
 * @returns {Object}
 */
export function getFullShopData (state) {
  return cloneDeep(state)
}
