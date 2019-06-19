import axios from 'axios'

/**
 * Login user
 */
export async function login_user ({ rootGetters }) {
  let url = `${rootGetters.get_api_url}/accounts/login`
  let data = {
    social: {
      token: rootGetters.get_access_token
    }
  }

  await axios.post(url, data)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

/**
 * Register user
 */
export async function register_user ({ rootGetters }) {
  let url = `${rootGetters.get_api_url}/accounts/register`
  let data = {
    social: {
      token: rootGetters.get_access_token
    }
  }

  await axios.post(url, data)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}
