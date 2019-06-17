import { pick, mapValues } from 'lodash-es'
import { format } from 'quasar'

// --- TODO: вынести в utils
function bytes_to_size (megabytes) {
  let bytes = megabytes * 1048576
  return format.humanStorageSize(bytes)
}

/**
 * Returns game url
 * @returns {function(game_id: string): string}
 */
export function get_game_url () {
  return game_id => `${process.env.API_URL}/games/${game_id}`
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

    return {
      ...system_data,
      minimal: {
        ...system_data.minimal,
        ram: bytes_to_size(system_data.minimal.ram),
        disk_space: bytes_to_size(system_data.minimal.disk_space)
      },
      recommended: {
        ...system_data.recommended,
        ram: bytes_to_size(system_data.recommended.ram),
        disk_space: bytes_to_size(system_data.recommended.disk_space)
      }
    }
  })
}
