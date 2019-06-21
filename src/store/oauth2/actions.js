import axios from 'axios'

/**
 * Logout user from p1 auth1 service
 */
export async function logout ({ state, commit }) {
  let url = `${state.url}/logout`
  await axios(url)
  commit('remove_token_expires')
  commit('remove_token')
}

/**
 * refresh token
 */
export async function refresh_token ({ state, commit }) {
  let url = `${state.url}/refresh`
  let { data } = await axios(url)
  let { access_token, expires_in } = data
  if (access_token) commit('set_token', access_token)
  if (expires_in) commit('set_token_expires', expires_in)
}

/**
 * update auth1 user info
 */
export async function update_user_info ({ state, commit }) {
  let url = `${state.url}/userinfo`
  await axios(url)
    .then(({ data }) => commit('set_user_info', data))
}
