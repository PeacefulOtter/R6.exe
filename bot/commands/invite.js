
const settings     = require( '../settings.json' )
const inviteBot    = `https://discordapp.com/oauth2/authorize?client_id=${settings.id}&scope=bot&permissions=${settings.permissions}`;
const inviteServer = 'https://discord.gg/PHkUASp';
const inviteGithub = 'https://github.com/PeacefulOtter';
const footerIcon   = 'https://image.ibb.co/bMZPOT/Dokkaebi_icon.png';

exports.run = async (client, message, args) => {
  let desc = `
    :spy: **Invite R6.exe** Bot to your **server** : \n${inviteBot} \n
:black_nib: Got any **feedback**, **questions** or **bug reports** ? We would love to hear them at : \n${inviteServer} \n
:keyboard: Developer? Check my GitHub page : \n${inviteGithub}
  `;
  let date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

  let embed = new client.Discord.RichEmbed({
    title : 'Invite links !',
    description : desc,
    color : 0x0F0F0F
  })
    .setFooter('made by PeacefulOtter#5987 | ' + date, footerIcon);
  await message.channel.send( embed );
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['i'],
};

exports.help = {
  name: 'invite',
  category: 'General',
  description: 'Invite message',
  usage: 'invite'
};
