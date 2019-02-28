/**
 * Toggle loaded state
 * @params {Object} data
 */
export function toggleLoadedState (state, value) {
  // --- TODO: test variant
  this.state.initial.loaded = (typeof value === 'boolean') ? value : !this.state.loaded
}
