import { pick, mapValues } from 'lodash-es'

/**
 * Returns game url
 * @param state
 * @returns {function(game_id: string): string}
 */
export function get_game_url ({ url }) {
  return game_id => `${url}/games/${game_id}`
}

export function get_system_requirements ({ game }) {
  let requirements = pick(game.requirements.systems, game.platforms)
  return mapValues(requirements, (system_data, system) => {
    switch (system) {
      case 'windows':
        system_data.icon = 'fab fa-windows'
        break
      case 'mac_os':
        system_data.icon = 'fab fa-apple'
        break
      case 'linux':
        system_data.icon = 'fab fa-linux'
        break
      default: break
    }
    return system_data
  })
}
