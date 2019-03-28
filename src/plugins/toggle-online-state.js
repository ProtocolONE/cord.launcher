export default ({ store }) => {
  function toggleOnlineState (onLine) {
    store.commit('SET_ONLINE_STATE', onLine)
  }

  if (process.env.CLIENT && process.env.MODE === 'electron') {
    window.addEventListener('load', function () {
      window.addEventListener('online', () => toggleOnlineState(true))
      window.addEventListener('offline', () => toggleOnlineState(false))

      toggleOnlineState(navigator.onLine)
    })
  }
}
