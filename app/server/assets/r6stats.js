
const fetch = require( 'node-fetch' )

const API_KEY    = '018a934c-738d-4211-ab9a-08829dbacd18'
const API_URL    = 'https://api2.r6stats.com/public-api/stats'
const API_HEADER = {
  Authorization: API_KEY
}

/*
  API USAGE
    https://api2.r6stats.com/public-api/stats/<username>/<platform>/<type>

    username :   any given username
    platform :   pc, psn, xone
    type     :   generic, seasonal, operators, weapon-categories or weapons
*/

async function R6Stats( username, platform ) {
  let type = 'generic'
  let fetchurl = `${API_URL}/${username}/${platform}/${type}`
  let response
  await fetch( fetchurl, { headers : API_HEADER } ).then( ( res ) => {
    return res.json()
  } ).then( stats => {
    response = stats
  } ).catch( err => {
    response = { status : 'error' }
  } )
  return response
}

module.exports = R6Stats
