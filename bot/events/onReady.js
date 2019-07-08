
const settings = require( '../settings.json' )
const logger   = require( '../utils/logger.js' )

module.exports = async client => {
  logger.log( `Logged in as ${client.user.tag}!` )
	client.user.setActivity( `${settings.prefix}help`, { type: 'PLAYING' } )
}
