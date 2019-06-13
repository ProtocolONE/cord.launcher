/**
 * Returns game url
 * @param state
 * @returns {function(game_id: string): string}
 */
export function get_game_url (state) {
  return game_id => `${state.url}/games/${game_id}`
}
