import axios from 'axios'

/**
 * Logout user from p1 auth1 service
 */
export async function logout ({ state, commit }) {
  let url = `${state.url}/logout`
  await axios(url)
    .catch(() => null) // getting rid of 500
    .finally(() => {
      commit('remove_token_expires')
      commit('remove_token')
    })
}

/**
 * refresh token
 */
export async function refresh_token ({ state, commit }) {
  try {
    let url = `${state.url}/refresh`
    let { data } = await axios(url)
    let { access_token, expires_in } = data
    if (access_token) commit('set_token', access_token)
    if (expires_in) commit('set_token_expires', expires_in)
  }
  catch (err) {
    console.error(err)
  }
}
