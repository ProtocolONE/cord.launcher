import axios from 'axios'

/**
 * Logout user from p1 auth1 service
 */
export async function check_user ({ state }) {
  let url = `${process.env.API_URL}/me`
  await axios(url)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}
