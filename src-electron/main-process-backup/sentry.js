const { init } = require('@sentry/electron')

init({
  dsn: 'https://793515aa1e5a4be79738f53daec098db@sentry.tst.protocol.one/12',
  enableNative: false
})
