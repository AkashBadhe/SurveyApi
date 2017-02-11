var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
    db: 'mongodb://localhost/multivision',
    rootPath: rootPath,
    port: process.env.PORT || 3030
  },
  production: {
    rootPath: rootPath,
    db: 'mongodb://akashbadhe:Askext%40003@ds147979.mlab.com:47979/surveydb',
    port: process.env.PORT || 80
  }
}