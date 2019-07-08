
const cloudinary    = require( 'cloudinary' )
const settings      = require( './settings.json' )
const logger        = require( './utils/logger.js' )
const { promisify } = require( 'util' )
const readdir       = promisify( require( 'fs' ).readdir )
const Enmap = require( 'enmap' )

const eventsBind = {
  onReady: 'ready',
  onMessage: 'message',
  onMemberJoined: 'guildMemberAdd'
}

module.exports = class R6EXE {

  constructor( client ) {
    this.client            = client
    this.client.commands   = new Enmap()
    this.client.aliases    = new Enmap()
    this.client.cloudinary = cloudinary
    this.client.cloudinary.config( {
      cloud_name: settings.cloudinary_cloud_name,
      api_key: settings.cloudinary_api_key,
      api_secret: settings.cloudinary_api_secret
    } )
  }

  async initialize() {
    const cmdFiles = await readdir( './commands/' )
    logger.log( `Loading a total of ${cmdFiles.length} commands.` )
    cmdFiles.forEach( async command => {
      if ( !command.endsWith( '.js' ) ) return
      try {
    		const props = require( `./commands/${command}` )
    		logger.log( `Loading Command: ${props.help.name}.` )
    		if ( props.init ) {
    			props.init( client )
    		}
    		this.client.commands.set( props.help.name, props )
        props.conf.aliases.forEach( alias => {
          this.client.aliases.set( alias, props.help.name )
        } );
    	} catch ( e ) {
    		logger.log( `Unable to load command ${command}: ${e.stack}` )
    	}
    } )

    const evtFiles = await readdir( './events/' )
    logger.log( `Loading a total of ${evtFiles.length} events.` )
    evtFiles.forEach( file => {
      const eventName = file.split( '.' )[ 0 ]
      const eventFile = require( `./events/${file}` )
      logger.log( `Loading Event: ${eventName}.` )
      // this line is awesome take a deep breath and read it ^^'
      this.client.on( eventsBind[ eventName ], eventFile.bind( null, this.client ) )
      const mod = require.cache[ require.resolve( `./events/${file}` ) ]
      delete require.cache[ require.resolve( `./events/${file}` ) ]

      for ( let i = 0; i < mod.parent.children.length; i++ ) {
        if ( mod.parent.children[ i ] === mod ) {
          mod.parent.children.splice( i, 1 )
          break
        }
      }
    } )

    await this.client.login( settings.token )
  }
}



/*
const Discord       = require( 'discord.js' )
const client        = new Discord.Client()
const settings      = require( './settings.json' )
const logger        = require( './utils/logger.js' )
const { promisify } = require( 'util' )
const readdir       = promisify( require( 'fs' ).readdir )
const Enmap         = require( 'enmap' )
const eventsBind    = {
  'onReady': 'ready',
  'onMessage': 'message',
  'onMemberJoined': 'guildMemberAdd',
  'onMemberLeft': ''
}
var pathMain = './main.js'

module.exports.Discord = Discord
module.exports.config  = config
module.exports.logger  = logger

client.commands = new Enmap()
client.aliases  = new Enmap()


client.loadCommand = ( commandName ) => {
  try {
		const props = require( `./commands/${commandName}` )
		logger.log( `Loading Command: ${props.help.name}.` )
		if ( props.init ) {
			props.init( client );
		}
		client.commands.set( props.help.name, props );
    props.conf.aliases.forEach( alias => {
      client.aliases.set( alias, props.help.name );
    } );
		return false
	} catch ( e ) {
		return `Unable to load command ${commandName}: ${e.stack}`;
	}
}


client.unloadCommand = ( commandName ) => {
	let command
	if ( client.commands.has( commandName ) ) {
		command = client.commands.get( commandName )
	} else if ( client.aliases.has( commandName ) ) {
		command = client.commands.get( client.aliases.get( commandName ) )
	}
	if ( !command ) return `The command \`${commandName}\` doesn't seem to exist, nor is it an alias. Try again!`

	delete require.cache[ require.resolve( `../commands/${commandName}.js` ) ]
	return false;
}


const init = async () => {
  const cmdFiles = await readdir( './commands/' )
  logger.log( `Loading a total of ${cmdFiles.length} commands.` )
  cmdFiles.forEach( f => {
    if ( !f.endsWith( '.js' ) ) return
    const response = client.loadCommand( f )
    if ( response ) { logger.log( response ) }
  } )

  const evtFiles = await readdir( './events/' )
  logger.log( `Loading a total of ${evtFiles.length} events.` )
  evtFiles.forEach( file => {
    const eventName = file.split( '.' )[ 0 ]
    const event     = require( `./events/${file}` )
    logger.log( `Loading Event: ${eventName}.` )
    // this line is awesome take a deep breath and read it ^^'
    client.on( eventsBind[ eventName ], event.bind( null, client ) )
    const mod = require.cache[ require.resolve( `./events/${file}` ) ]
    delete require.cache[ require.resolve( `./events/${file}` ) ]

    for ( let i = 0; i < mod.parent.children.length; i++ ) {
      if ( mod.parent.children[ i ] === mod ) {
        mod.parent.children.splice( i, 1 )
        break
      }
    }
  } )

	client.login( config.token )
}

init()
*/
