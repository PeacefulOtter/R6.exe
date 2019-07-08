
const settings = require( '../settings.json' )

exports.run = async ( client, message, args ) => {
  if ( settings.owner !== ( message.author.id ).toString() ) { return }
  await message.channel.send( 'Bot is shutting down.' )
  process.exit( 1 )
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [ 's', 'off', 'quit' ],
  required_params: 0
}

exports.help = {
  name: 'shutdown',
  category: 'System',
  description: 'Shuts down the bot.',
  usage: 'shutdown | s | off | quit',
  arguments: '',
  message: `${settings.prefix}shutdown`,
  example: `${settings.prefix}shutdown`
}
