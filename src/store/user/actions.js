import axios from 'axios'

/**
 * Register user
 */
export async function register ({ rootGetters }, user_data) {
  let url = `${rootGetters.get_api_url}/accounts/register`
  await axios.post(url, user_data)
}

/**
 * Login user
 * Also check user does it exist
 * @returns {Boolean} - successfully login true/fale
 */
export async function login ({ rootGetters, commit }) {
  let url = `${rootGetters.get_api_url}/accounts/login`
  try {
    await axios.post(url, {})
      .then(({ data }) => commit('set_user', data))
    return true
  }
  catch (err) {
    if (err.response.data.code === 404) {
      return false
    }
    else {
      console.error(err, Object.keys(err))
    }
  }
}

/**
 * Logout user
 */
export async function logout ({ commit }) {
  // --- TODO: logout from qilinstore
  commit('set_user', null)
}

/**
 * Load user data
 */
export async function load_user_data ({ rootGetters, commit }) {
  let url = `${rootGetters.get_api_url}/profiles/me`
  await axios(url)
    .then(({ data }) => commit('set_user', data))
}

/**
 * Update/save user data
 */
export async function save_user_data ({ rootGetters, commit }, user_data) {
  let url = `${rootGetters.get_api_url}/profiles/me`
  await axios.put(url, user_data)
    .then(({ data }) => commit('set_user', data))
}
