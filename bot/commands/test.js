
const request    = require( 'request' )
const logger     = require( '../utils/logger.js' )
const settings   = require( '../settings.json' )

const discordJoinMessages = [
  "**{{user}}** just joined. Can I get a heal?",
  "Welcome **{{user}}**. Leave your weapons by the door.",
  "A wild **{{user}}** appeared.",
  "Swoooosh. **{{user}}** just landed.",
  "Brace yourselves. **{{user}}** just joined the server.",
  "**{{user}}** just arrived. Seems OP - please nerf.",
  "**{{user}}** just slid into the server.",
  "A **{{user}}** has spawned in the server.",
  "**{{user}}** just showed up. Hold my beer.",
  "Time to get schwifty, **{{user}}** popped !",
  "**{{user}}** ist ze Übermensch !",
  "**{{user}}** landed. Get to an Upgrade Station, schnell !",
  "Bonk! The scout **{{user}}** is here",
  "Hey, who's on fire now? **{{user}}**.",
  "**{{user}}** says : Teleporter comin' right up.",
  "**{{user}}** dropped. Time to hide, cowards !",
  "**{{user}}** says : The cart isn't moving, gentlemen !"
]


exports.run = async ( client, message, args ) => {
  let member = message.member
  let guild  = member.guild;
  // picking a random message from my welcome message list
  let indexMessage = Math.floor( Math.random() * Math.floor( discordJoinMessages.length ) )
  let pickMessage  = discordJoinMessages[ indexMessage ];
  // replace the "user" by the member's name
  let welcomeMessage = pickMessage.replace( '{{user}}', member.user.tag );
  // get the guild's welcome channel
  let channel = guild.channels.find( x => x.name === 'welcome' ) || guild.channels.find( x => x.name === 'bienvenue' ) || null;
  // If it doesn't find any, exit the command.
  if ( channel === null ) { return };
  // convert the member and guild name into a URL format
  let memberForUrl = ( member.user.tag ).replace( '#', '%23' ).replace( ' ', '%20' );
  let guildForUrl  = encodeURI( guild.name );
  // take the avatar url of the member and the guild
  let memberAvatarUrl = member.user.avatarURL;
  let guildAvatarUrl  = guild.iconURL;

  // upload the images on cloudinary
  await client.cloudinary.v2.uploader.upload( memberAvatarUrl,
    { folder: 'remote_media/', public_id: 'pp1' },
    function( error, result ) { } );
  await client.cloudinary.v2.uploader.upload( guildAvatarUrl,
    { folder: 'remote_media/', public_id: 'pp2' },
    function( error, result ) { } );

  // change font size depending on the size of the guild's name
  let fontSize;
  if      ( guild.name.length <= 10 )                          { fontSize = 80 }
  else if ( guild.name.length > 10 && guild.name.length < 15 ) { fontSize = 70 }
  else if ( guild.name.length > 15 && guild.name.length < 20 ) { fontSize = 60 }
  else if ( guild.name.length >= 20 )                          { fontSize = 50 };

  // convert these urls into an image using cloudinary
  let welcomeMessageUrl = [
    `https://res.cloudinary.com/genjy/image/upload/c_crop,h_600/`,
    `a_0,c_scale,h_130,l_remote_media:pp1,r_max,x_-175,y_-175/`,
    `c_scale,h_150,l_remote_media:pp2,r_max,x_140,y_-190/`,
    `co_rgb:ffffff,l_text:Gruppo_70_center:${memberForUrl},y_70/`,
    `co_rgb:ffffff,l_text:Convergence_${fontSize}_center:Welcome%20to%20${guildForUrl},y_145/`,
    `v1528882462/tom_clancys_rainbow_six_siege_operators-wallpaper-1280x768.jpg`
  ].join( '' );

  const options = {
    url: welcomeMessageUrl,
    method: 'GET',
    encoding: null
  }

  request( options, async function( err, res, body ) {
    await channel.send( welcomeMessage, { file: body } );
  } );

  /*await cloudinary.v2.uploader.destroy(
    'remote_media/pp1', { invalidate : true },
    function( error, result ) { }
  );
  await cloudinary.v2.uploader.destroy(
    'remote_media/pp2', { invalidate : true },
    function( error, result ) { }
  );*/
};


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [ 't', 'te', 'tes' ],
};

exports.help = {
  name: 'test',
  category: 'test',
  description: 'test',
  usage: 'test'
};
