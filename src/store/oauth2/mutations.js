import { LocalStorage } from 'quasar'

/**
 * Save token
 * Also set in web (local) storage
 *
 * @param state
 * @param access_token - oauth2 token
 * @type access_token - {String}
 */
export function set_token (state, access_token) {
  LocalStorage.set('access_token', access_token)
  state.access_token = access_token
}

/**
 * Remove token
 * Also remove from web (local) storage
 */
export function remove_token (state) {
  LocalStorage.remove('access_token')
  state.access_token = null
}

/**
 * Save token expires time as date.now() +
 * token expires time in ms
 *
 * @param state
 * @param token_expires
 * @type token_expires - {Number}
 */
export function set_token_expires (state, token_expires) {
  // --- turn into ms
  token_expires *= 1000
  // --- update date for token
  token_expires += Date.now()
  LocalStorage.set('token_expires', token_expires)
  state.token_expires = token_expires
}

/**
 * Remove token expires time
 */
export function remove_token_expires (state) {
  LocalStorage.remove('token_expires')
  state.token_expires = null
}
