import axios from 'axios'

let oauth2_url = process.env.HOST
if (process.env.OAUTH2_PORT) {
  oauth2_url += `:${process.env.OAUTH2_PORT}`
}

export default {
  namespaced: true,

  state: {
    url: oauth2_url,
    access_token: localStorage.getItem('access_token')
  },

  actions: {
    async logout ({ state, commit }) {
      let url = `${state.url}/logout`
      await axios(url, { withCredentials: true })
        // getting rid of 500
        .catch(() => null)
        .finally(() => commit('remove_token'))
    }
  },

  mutations: {
    set_token (state, access_token) {
      localStorage.setItem('access_token', access_token)
      state.access_token = access_token
    },

    remove_token (state) {
      localStorage.removeItem('access_token')
      state.access_token = null
    }
  }
}
