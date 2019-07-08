
const fetch    = require( 'node-fetch' )
const request  = require( 'request' )
const settings = require( '../settings.json' )
const cloudinary = require( 'cloudinary' )
const platforms  = [ 'uplay', 'psn', 'xone' ]
const targets    = [ 'overall', 'casual', 'ranked', 'o', 'c', 'r' ]
const API_HEADER = {
  Authorization: settings.r6_api_key
}


function text( msg, size, xpos, ypos ) {
  return {
    overlay: {
      font_family: 'ABeeZee',
      font_size: size,
      text: msg
    },
    color: '#14b9df', gravity: 'west', x: xpos, y: ypos
  }
}

function prettifyDate( seconds ) {
  return new Date( seconds * 1000 ).toISOString().substr( 11, 8 )
}


async function R6Stats( username, platform, target ) {
  let type = 'generic'
  let fetchurl = `${settings.r6_api_url}/${username}/${platform}/${type}`

  let data = await fetch( fetchurl, { headers : API_HEADER } )
  let d    = await data.json()


  if ( target == 'overall' ) {
    let overall = d.stats.general
    let mods = [
      text( username,                         100, 650,   -455 ),
      text( d.progression.level.toString(),   95,  1700,  -460 ),
      text( overall.bullets_fired.toString(), 75,  940,   -305 ),
      text( overall.bullets_hit.toString(),   75,  940,   -175 ),
      text( overall.headshots.toString(),     75,  940,   -45  ),
      text( overall.kills.toString(),         75,  940,   80   ),
      text( overall.deaths.toString(),        75,  940,   210  ),
      text( overall.assists.toString(),       75,  940,   340  ),
      text( overall.melee_kills.toString(),   75,  940,   465  )
    ]
    return await cloudinary.image( 'background_overall.jpg', {
      transformation: mods
    } )
  } else if ( target == 'casual' || target == 'c' ) {
    let casual   = d.stats.queue.casual
    let playtime = prettifyDate( casual.playtime )
    let mods     = [
      text( username,                         100, 650,   -455 ),
      text( d.progression.level.toString(),   95,  1700,  -460 ),
      text( casual.games_played.toString(),   75,  940,   -305 ),
      text( casual.wins.toString(),           75,  940,   -175 ),
      text( casual.losses.toString(),         75,  940,   -45  ),
      text( casual.kills.toString(),          75,  940,   80   ),
      text( casual.deaths.toString(),         75,  940,   210  ),
      text( casual.kd.toString(),             75,  940,   340  ),
      text( playtime.toString(),              75,  940,   465  )
    ]
    return await cloudinary.image( 'background_casual.jpg', {
      transformation: mods
    } )
  } else if ( target == 'ranked' || target == 'r' ) {
    let ranked   = d.stats.queue.ranked
    let playtime = prettifyDate( ranked.playtime )
    let mods     = [
      text( username,                         100, 650,   -455 ),
      text( d.progression.level.toString(),   95,  1700,  -460 ),
      text( ranked.games_played.toString(),   75,  940,   -305 ),
      text( ranked.wins.toString(),           75,  940,   -175 ),
      text( ranked.losses.toString(),         75,  940,   -45  ),
      text( ranked.kills.toString(),          75,  940,   80   ),
      text( ranked.deaths.toString(),         75,  940,   210  ),
      text( ranked.kd.toString(),             75,  940,   340  ),
      text( playtime.toString(),              75,  940,   465  )
    ]
    return await cloudinary.image( 'background_casual.jpg', {
      transformation: mods
    } )
  } else {
    return { status: 'error', message: ':koala: Oops, I cannot find this player' }
  }
}

exports.run = async ( client, message, args ) => {
  await message.channel.startTyping()
  let target = 'overall' // select overall stats

  if ( args.length === 2 && !platforms.includes(args[ 1 ]) ) {
    await message.channel.stopTyping()
    await message.channel.send( ':penguin: Please enter a **correct platform** (`uplay`, `psn`, or `xone`)' )
    return
  } else if ( args.length === 3 && !targets.includes(args[ 2 ]) ) {
    await message.channel.stopTyping()
    await message.channel.send( ':penguin: Please enter a **correct target** (`overall`, `casual`, or `ranked`)' )
    return
  } else if ( args.length === 3 && targets.includes( args[ 2 ]) ) {
    target = args[ 2 ]
  }

  let username = args[ 0 ]
  let platform = args[ 1 ]
  let imgSrc = await R6Stats( username, platform, target )
  let imgUrl = imgSrc.split( "'" )[ 1 ]

  if ( imgUrl.status && imgUrl.status == 'error' ) {
    await message.channel.stopTyping()
    await message.channel.send( ':koala:  **Can\'t find** this **user**' )
    return
  } else {
    request( {
      url: imgUrl,
      method: 'GET',
      encoding: null
    }, async function( err, res, body ) {
      await message.channel.stopTyping()
      await message.channel.send( '', { file: body } );
    } )
  }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [ 'r6', 'stats' ],
  required_params: 2
}

exports.help = {
  name: 'r6stats',
  category: 'R6',
  description: 'Get R6 stats of a player',
  usage: 'r6stats | r6 | stats',
  arguments: '[username] [platform] {target}',
  message: `${settings.prefix}stats  [ username ]  [ platform (pc, psn, xone) ]  { target (overall, casual or overall) }`,
  example: `${settings.prefix}stats EXO_Azrol uplay casual`
}




/*
overall
response = [
    `https://res.cloudinary.com/genjy/image/upload/q_100/c_scale,`,
    `co_rgb:14b9df,l_text:ABeeZee_90_center:${username},x_-300,y_-455/`,
    `co_rgb:14b9df,l_text:ABeeZee_85_center:${data.progression.level},x_790,y_-455/`,
    `co_rgb:14b9df,l_text:ABeeZee_75_center:${overall.bullets_fired},x_50,y_-305/`,
    `co_rgb:14b9df,l_text:ABeeZee_75_center:${overall.bullets_hit},x_50,y_-175/`,
    `co_rgb:14b9df,l_text:ABeeZee_75_center:${overall.headshots},x_50,y_-45/`,
    `co_rgb:14b9df,l_text:ABeeZee_75_center:${overall.kills},x_50,y_80/`,
    `co_rgb:14b9df,l_text:ABeeZee_75_center:${overall.deaths},x_50,y_210/`,
    `co_rgb:14b9df,l_text:ABeeZee_75_center:${overall.assists},x_50,y_340/`,
    `co_rgb:14b9df,l_text:ABeeZee_75_center:${overall.melee_kills},x_50,y_465/`,
    `v1561789784/background_overall.jpg`
  ].join( '' )


casual
response = [
  `https://res.cloudinary.com/genjy/image/upload/q_100/c_scale,`,
  `co_rgb:14b9df,l_text:ABeeZee_90_center:${username},x_-50,y_-460/`,
  `co_rgb:14b9df,l_text:ABeeZee_85_center:${d.progression.level},x_800,y_-455/`,
  `co_rgb:14b9df,l_text:ABeeZee_75_center:${casual.games_played},x_150,y_-305/`,
  `co_rgb:14b9df,l_text:ABeeZee_75_center:${casual.wins},x_150,y_-175/`,
  `co_rgb:14b9df,l_text:ABeeZee_75_center:${casual.losses},x_150,y_-45/`,
  `co_rgb:14b9df,l_text:ABeeZee_75_center:${casual.kills},x_150,y_80/`,
  `co_rgb:14b9df,l_text:ABeeZee_75_center:${casual.deaths},x_150,y_210/`,
  `co_rgb:14b9df,l_text:ABeeZee_75_center:${casual.kd},x_150,y_340/`,
  `co_rgb:14b9df,l_text:ABeeZee_75_center:${casual.playtime},x_150,y_465/`,
  `v1561789784/background_casual.jpg`
].join( '' )


ranked
response = [
  `https://res.cloudinary.com/genjy/image/upload/q_100/c_scale,`,
  `co_rgb:14b9df,l_text:ABeeZee_90_center:${username},x_-50,y_-460/`,
  `co_rgb:14b9df,l_text:ABeeZee_85_center:${d.progression.level},x_800,y_-455/`,
  `co_rgb:14b9df,l_text:ABeeZee_75_center:${ranked.games_played},x_150,y_-305/`,
  `co_rgb:14b9df,l_text:ABeeZee_75_center:${ranked.wins},x_150,y_-175/`,
  `co_rgb:14b9df,l_text:ABeeZee_75_center:${ranked.losses},x_150,y_-45/`,
  `co_rgb:14b9df,l_text:ABeeZee_75_center:${ranked.kills},x_150,y_80/`,
  `co_rgb:14b9df,l_text:ABeeZee_75_center:${ranked.deaths},x_150,y_210/`,
  `co_rgb:14b9df,l_text:ABeeZee_75_center:${ranked.kd},x_150,y_340/`,
  `co_rgb:14b9df,l_text:ABeeZee_75_center:${ranked.playtime},x_150,y_465/`,
  `v1561789784/background_ranked.jpg`
].join( '' )
*/
