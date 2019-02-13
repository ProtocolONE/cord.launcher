/**
 * Save shop data
 * @params {Object} data
 */
export function saveShopData (state, data) {
  // --- TODO: test variant
  this.state.shop = { ...state, ...data }
}
