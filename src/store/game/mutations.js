/**
 * Save game data
 * @params {Object} data
 */
export function saveGameData (state, data) {
  // --- TODO: test variant
  this.state.game = { ...state, ...data }
}
