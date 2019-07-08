
const Discord  = require( 'discord.js' )
const client   = new Discord.Client()
const R6EXE    = require( './bot.js' )
const settings = require( './settings.json' );


(async () => {
    await new R6EXE( client ).initialize()
})();
