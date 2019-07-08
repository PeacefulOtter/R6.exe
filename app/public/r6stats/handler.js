/*
const details  = window.location.pathname.split( '/' )
const postBody = {
  'platform':  details[ 3 ],
  'username':  details[ 4 ]
}*/
const HEADERS = {
  'Content-Type':                'application/json',
  'Origin':                      'http://localhost:5000',
  'Access-Control-Allow-Origin': 'http://localhost:5000',
  'User-Agent':                   navigator.userAgent

}
const correspondingPlatforms = {
  'pc'   : '/img/apple2.png',
  'ps4'  : '/img/playstation2.png',
  'xone' : '/img/xbox2.png'
}

function elt( id ) { return document.getElementById( id ) }


window.onload = async function() {
  let resp = await fetch(
    window.location.pathname, {
      method: 'POST',
      headers: HEADERS,
    }
  )
  let data = await resp.json()
  console.log(data);
  if ( data.status == 'error' ) {
    Swal.fire( {
      type: 'error',
      title: 'Ooops',
      html: 'This player does not exist',
      showConfirmButton: false,
      timer: 99999999
    } )
  } else {
    // top-tab
    elt( 'avatar' ).src = data.avatar_url_256
    elt( 'username' ).innerHTML = data.username
    elt( 'level' ).innerHTML = data.progression.level
    elt( 'xp' ).innerHTML = data.progression.total_xp
    elt( 'last-seen' ).innerHTML = data.aliases[ 0 ].last_seen_at // TO PRETIFY
    elt( 'last-update' ).innerHTML = data.last_updated // TO PRETIFY
    elt( 'platform' ).src = correspondingPlatforms[ data.platform ]

    // GENERAL
      // first container
    elt( 'kills' ).innerHTML = data.stats.general.kills
    elt( 'deaths' ).innerHTML = data.stats.general.deaths
    elt( 'kd' ).innerHTML = data.stats.general.kd
    elt( 'hs' ).innerHTML = data.stats.general.headshots
    elt( 'melee' ).innerHTML = data.stats.general.melee_kills
    elt( 'assists' ).innerHTML = data.stats.general.assists
    elt( 'res' ).innerHTML = data.stats.general.revives
    elt( 'suicides' ).innerHTML = data.stats.general.suicides
      // second container
    elt( 'games-played' ).innerHTML = data.stats.general.games_played
    elt( 'wins' ).innerHTML = data.stats.general.wins
    elt( 'losses' ).innerHTML = data.stats.general.losses
    elt( 'wl' ).innerHTML = data.stats.general.wl
    elt( 'draws' ).innerHTML = data.stats.general.draws
    elt( 'playtime' ).innerHTML = data.stats.general.playtime
      // third container
    elt( 'b-fired' ).innerHTML = data.stats.general.bullets_fired
    elt( 'b-hit' ).innerHTML = data.stats.general.bullets_hit
    elt( 'aim' ).innerHTML = `${Math.round( ( data.stats.general.bullets_hit / data.stats.general.bullets_fired ) * 100 )}%`
    elt( 'b-deploy' ).innerHTML = data.stats.general.barricades_deployed
    elt( 'r-deploy' ).innerHTML = data.stats.general.reinforcements_deployed
    elt( 'g-destroy' ).innerHTML = data.stats.general.gadgets_destroyed

    // CASUAL - RANKED
      // first container
    elt( 'casu-kills' ).innerHTML = data.stats.queue.casual.kills
    elt( 'casu-deaths' ).innerHTML = data.stats.queue.casual.deaths
    elt( 'casu-kd' ).innerHTML = data.stats.queue.casual.kd
    elt( 'casu-matches' ).innerHTML = data.stats.queue.casual.games_played
    elt( 'casu-wins' ).innerHTML = data.stats.queue.casual.wins
    elt( 'casu-losses' ).innerHTML = data.stats.queue.casual.losses
    elt( 'casu-wl' ).innerHTML = data.stats.queue.casual.wl
    elt( 'casu-playtime' ).innerHTML = data.stats.queue.casual.playtime
      // second container
    elt( 'rank-kills' ).innerHTML = data.stats.queue.ranked.kills
    elt( 'rank-deaths' ).innerHTML = data.stats.queue.ranked.deaths
    elt( 'rank-kd' ).innerHTML = data.stats.queue.ranked.kd
    elt( 'rank-matches' ).innerHTML = data.stats.queue.ranked.games_played
    elt( 'rank-wins' ).innerHTML = data.stats.queue.ranked.wins
    elt( 'rank-losses' ).innerHTML = data.stats.queue.ranked.losses
    elt( 'rank-wl' ).innerHTML = data.stats.queue.ranked.wl
    elt( 'rank-playtime' ).innerHTML = data.stats.queue.ranked.playtime
  }
}
