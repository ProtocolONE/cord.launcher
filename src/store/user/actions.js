import axios from 'axios'

/**
 * Register user
 */
export async function register ({ rootGetters }, user_data) {
  let url = `${rootGetters.get_api_url}/accounts/register`
  await axios.post(url, user_data)
}

/**
 * Check user is registered
 *
 * @param rootGetters
 * @returns {Boolean} user_is_registered
 */
export async function check_is_registered ({ rootGetters }) {
  let url = `${rootGetters.get_api_url}/profiles/me`
  try {
    // --- get user data
    await axios(url)
    // --- user found
    return true
  }
  catch (err) {
    // --- user not found
    if (err.response.data.code === 404) {
      return false
    }
  }
}

/**
 * Login user
 */
export async function login ({ rootGetters, commit }) {
  let url = `${rootGetters.get_api_url}/accounts/login`
  await axios.post(url, {})
    .then(({ data }) => commit('set_user', data))
}

/**
 * Logout user
 */
export async function logout ({ commit }) {
  // --- TODO: logout from qilinstore
  commit('set_user', null)
}
