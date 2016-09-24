var NODE_ENV = process.env.NODE_ENV;
var CONFIG = require(`./${NODE_ENV || 'development'}`);

module.exports = CONFIG;
