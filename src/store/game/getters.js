import {
  uniqueId,
  pick,
  mapValues
} from 'lodash-es'

import { format } from 'quasar'

// --- TODO: вынести в utils
function bytes_to_size (megabytes) {
  let bytes = megabytes * 1048576
  return format.humanStorageSize(bytes)
}

/**
 * Get current game url by id
 */
export function get_game_url (state, getters, rootState, rootGetters) {
  return game_id => `${rootGetters.get_api_url}/games/${game_id}`
}

/**
 * Get system requirements with fontawesome icons
 */
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

/**
 * Get game media
 * Trailers first then screenshots
 */
export function get_game_media ({ game }) {
  function get_item (url, is_video = false) {
    return {
      url,
      is_video,
      id: uniqueId('game-media-item-')
    }
  }

  let { screenshots, trailers } = game.media

  trailers = trailers.map(url => get_item(url, true))
  screenshots = screenshots.map(url => get_item(url))

  return [...trailers, ...screenshots]
}
