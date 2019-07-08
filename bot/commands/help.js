

const helpMessageUrl = 'http://res.cloudinary.com/genjy/image/upload/v1529146552/operation_health_2.png'

exports.run = async ( client, message, args ) => {
  await message.channel.send( '', { file: helpMessageUrl } );
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
};

exports.help = {
  name: 'help',
  category: 'Utils',
  description: 'Help message to get all the bot commands',
  usage: 'help (command)'
};
