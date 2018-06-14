const path = require('path')
module.exports = {
  development: {
    port: process.env.PORT || 5000,
    dbPath: 'mongodb://localhost:27017/messengerDb',
    rootPath: path.normalize(
      path.join(__dirname, '../../'))
  },
  production: {}
}
