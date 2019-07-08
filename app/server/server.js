

const express      = require( 'express' )
const app          = express()
const cors         = require( 'cors' )
const r6stats      = require( './assets/r6stats' )

app.enable( 'trust proxy' )
app.use( cors() )
app.use( express.json() )
app.use( express.static( __dirname + '/public' ) )


app.post( '/stats/r6', async ( req, res, next ) => {
  let data = await r6stats( req.body.username, req.body.platform )
  await res.json( data )
} )


app.get( '/stats/r6/:platform/:username', ( req, res, next ) => {
  res.sendFile( __dirname + '/public/r6stats.html' )
} )


app.listen( 5000, () => {
  console.log( 'App listening on port ' + 5000 )
} )
