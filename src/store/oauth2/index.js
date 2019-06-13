import axios from 'axios'

let oauth2_url = process.env.HOST
if (process.env.OAUTH2_PORT) {
  oauth2_url += `:${process.env.OAUTH2_PORT}`
}

export default {
  namespaced: true,

  state: {
    /**
     * p1 auth1 url for auth2 service
     * @type {String}
     */
    url: oauth2_url,

    /**
     * user access token
     * @type {String|null}
     */
    access_token: localStorage.getItem('access_token'),

    /**
     * token expires date
     * @type {String|null}
     */
    token_expires: localStorage.getItem('token_expires')
  },

  actions: {
    /**
     * Logout user from p1 auth1 service
     */
    async logout ({ state, commit }) {
      let url = `${state.url}/logout`
      await axios(url)
        .catch(() => null) // getting rid of 500
        .finally(() => {
          commit('remove_token_expires')
          commit('remove_token')
        })
    },

    async refresh_token ({ state, commit }) {
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
  },

  mutations: {
    /**
     * Save token
     * Also set in web (local) storage
     *
     * @param state
     * @param access_token - oauth2 token
     * @type access_token - {String}
     */
    set_token (state, access_token) {
      localStorage.setItem('access_token', access_token)
      state.access_token = access_token
    },

    /**
     * Remove token
     * Also remove from web (local) storage
     */
    remove_token (state) {
      localStorage.removeItem('access_token')
      state.access_token = null
    },

    /**
     * Save token expires time as date.now() +
     * token expires time in ms
     *
     * @param state
     * @param token_expires
     * @type token_expires - {Number}
     */
    set_token_expires (state, token_expires) {
      // --- turn into ms
      token_expires *= 1000
      // --- update date for token
      token_expires += Date.now()
      localStorage.setItem('token_expires', token_expires)
      state.token_expires = token_expires
    },

    /**
     * Remove token expires time
     */
    remove_token_expires (state) {
      localStorage.removeItem('token_expires')
      state.token_expires = null
    }
  }
}
