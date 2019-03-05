import { cloneDeep } from 'lodash'

/**
 * Returns the full clone state
 * @returns {Object}
 */
export function getFullShopData (state) {
  return cloneDeep(state)
}
