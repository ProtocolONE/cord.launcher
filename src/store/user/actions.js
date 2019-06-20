import axios from 'axios'

/**
 * Login user
 */
export async function login_user ({ rootGetters }) {
  // let url = `${rootGetters.get_api_url}/accounts/login`
  // let data = {
  //   social: {
  //     token: rootGetters.get_access_token
  //   }
  // }

  // await axios.post(url, data)
  //   .then(res => console.warn(res))
  //   .catch(err => console.error(err))
}

/**
 * Register user
 */
export async function register_user ({ rootGetters }, user_data) {
  let url = `${rootGetters.get_api_url}/accounts/register`
  await axios.post(url, user_data)
    .then(res => console.warn(res))
    .catch(err => console.error(err))
}
