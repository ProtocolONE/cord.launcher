import { cloneDeep } from 'lodash-es'

/**
 * Returns the full clone state
 * @returns {Object}
 */
export function getFullGameData (state) {
  return cloneDeep(state)
}
