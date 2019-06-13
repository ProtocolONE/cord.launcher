import axios from 'axios'
import { Notify } from 'quasar'

/**
 * Load game data
 * Show notify when loading has a error
 * With handler action $router.go(-1)
 *
 * @param commit
 * @param getters
 * @param game_id - Game id
 */
export async function load_game ({ commit, getters }, game_id) {
  let url = getters.get_game_url(game_id)
  await axios(url)
    .then(res => commit('set_game', res.data))
    .catch(err => Notify.create({
      message: `
        <ul class="list">
          <li><b>code:</b> ${err.response.data.code}</li>
          <li><b>message:</b> ${err.response.data.message}</li>
        </ul>
      `,
      position: 'top-right',
      color: 'negative',
      icon: 'warning',
      html: true,
      timeout: 0,
      actions: [
        {
          label: this._vm.$trans('labels', 'back'),
          color: 'white',
          handler: () => this.$router.go(-1)
        }
      ]
    }))
}
