
const allOperatorsList = {
  'all': [
    'Vigil', 'Dokkaebi', 'Jackal', 'Mira', 'Rook', 'Montagne', 'Twitch', 'Doc',
    'Frost', 'Buck', 'Zofia', 'Ela', 'Capitao', 'Caveira', 'Maestro', 'Alibi',
    'Jager', 'Iq', 'Bandit', 'Blitz', 'Lion', 'Finka', 'Valkyrie', 'Blackbeard',
    'Ash', 'Thermite', 'Pulse', 'Castle', 'Ying', 'Lesion', 'Glaz', 'Fuze',
    'Kapkan', 'Tachanka', 'Hibana', 'Echo', 'Thatcher', 'Sledge', 'Smoke', 'Mute'
  ],
  'att': [
    'Dokkaebi', 'Jackal', 'Montagne', 'Twitch', 'Buck', 'Zofia', 'Capitao',
    'Iq', 'Blitz', 'Lion', 'Finka', 'Blackbeard', 'Ash', 'Thermite', 'Ying',
    'Glaz', 'Fuze', 'Hibana', 'Thatcher', 'Sledge'
  ],
  'def': [
    'Vigil', 'Mira', 'Rook', 'Doc', 'Frost', 'Ela', 'Caveira', 'Maestro',
    'Alibi', 'Jager', 'Bandit', 'Valkyrie', 'Pulse', 'Castle', 'Lesion',
    'Kapkan', 'Tachanka', 'Echo', 'Smoke', 'Mute'
  ]
};


exports.run = async ( client, message, args ) => {
  await message.channel.startTyping();

  if ( !(args[0]) ) { args.push('all') }
  else if ( args[0] === 'attack' ) { args[0] = 'att' }
  else if ( args[0] === 'defense' ) { args[0] = 'def' }
  else if ( args[0] !== 'att' && args[0] !== 'def' ) { args[0] = 'all' };

  let mode          = args[0];
  let correctList   = allOperatorsList[ mode ];
  let pickOperator  = correctList[ Math.floor( Math.random() * Math.floor( correctList.length ) ) ];
  let xPos          = -950;
  let yPos          = (mode == 'all') ? -50 : 50;
  for ( let i=0; i < correctList.indexOf( pickOperator ); i++ ) {
    if ( xPos === 950 ) {
      xPos = -950;
      yPos = 150;
    } else {
      xPos += 100;
    }
  }
  let pickOperatorsUrl = `http://res.cloudinary.com/genjy/image/upload/l_arrow,x_${xPos},y_${yPos}/v1529062867/plate_${mode}.png`;
  await message.channel.send( `You picked **${pickOperator}**`, { file: pickOperatorsUrl } );
  await message.channel.stopTyping();
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [ 'choose', 'random', 'operator' ],
};

exports.help = {
  name: 'pick',
  category: 'R6',
  description: 'Pick a random Operator',
  usage: 'pick (att / def)'
};
