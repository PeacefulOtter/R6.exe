
const path    = require( 'path' )
// const url     = require( 'url' )
const express = require( 'express' )
const app     = express()
const cors    = require( 'cors' )
const r6stats = require( 'r6stats' )
const dotenv  = require( 'dotenv' )
dotenv.config()

app.enable( 'trust proxy' )
app.use( cors() )
app.use( express.json() )
app.use( express.static( '../public' ) )


app.get( '/stats/r6/:platform/:username', ( req, res, next ) => {
  console.log('get request');
  res.sendFile( path.join( __dirname + '/../public/r6stats.html' ) )
} )

app.post( '/stats/r6/:platform/:username', async ( req, res, next ) => {
  console.log('post request');
  try {
    console.log('before');
    const data = await r6stats( req.params.username, req.params.platform )
    console.log(data);
    await res.json( data )
  } catch( e ) {
    console.log(e);
    res.json( e )
  }
} )

const port = process.env.PORT || 5000
app.listen( port, () => {
  console.log( 'App listening on port ' + port )
} )
