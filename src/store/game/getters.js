import { cloneDeep } from 'lodash'

/**
 * Returns the full clone state
 * @returns {Object}
 */
export function getFullGameData (state) {
  return cloneDeep(state)
}
