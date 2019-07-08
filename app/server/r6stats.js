
const fetch = require( 'node-fetch' )

const API_URL    = 'https://api2.r6stats.com/public-api/stats'
const API_HEADER = {
  'Authorization': process.env.API_KEY
}

/*
  API USAGE
    https://api2.r6stats.com/public-api/stats/<username>/<platform>/<type>

    username :   any given username
    platform :   pc, psn, xone
    type     :   generic, seasonal, operators, weapon-categories or weapons
*/

module.exports = async function R6Stats( username, platform ) {
  console.log('here');
  console.log(username, platform);
  const r6Url = `${API_URL}/${username}/${platform}/generic`
  console.log(r6Url);
  const resp  = await fetch( r6Url, { headers : API_HEADER } )
  console.log(resp);
  if ( resp.ok ) {
    const stats = await resp.json()
    console.log(stats);
    return stats
  } else {
    return { status : 'error' }
  }
}
