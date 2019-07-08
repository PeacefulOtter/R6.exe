
const settings = require( '../settings.json' )

module.exports = ( client, message ) => {
  if ( message.author.bot ) return
  if ( message.content.indexOf( settings.prefix ) !== 0 ) return

  const args = message.content.slice( settings.prefix.length ).trim().split( / +/g )
  const command = args.shift().toLowerCase()
	const cmd = client.commands.get( command ) || client.commands.get( client.aliases.get( command ) )

	// no command found
	if ( !cmd ) return;
	// command not usable in DM
  if ( !message.guild && cmd.conf.guildOnly ) {
		return message.channel.send( 'This command is unavailable via private message. Please run this command in a guild.' )
  // help command message
  } else if ( args[ 0 ] && args[ 0 ] == 'help' ) {
    return message.channel.send(
      `> Help message for ***${cmd.help.name}*** command\n
      **Description** : \`${cmd.help.description}\`\n
      **Aliases** : \`${cmd.help.usage}\`\n
      **Arguments** []=required {}=optional : \`${cmd.help.arguments}\`\n
      **Usage** : \`${cmd.help.message}\`\n
      **Example** : \`${cmd.help.example}\``
    )
  // not the required parameters
  } else if ( args.length < cmd.conf.required_params ) {
    return message.channel.send( `Use this command as **following** : \n\`${cmd.help.message}\` \n***Example*** : \`${cmd.help.example}\`` );
  }

	cmd.run( client, message, args )
}
