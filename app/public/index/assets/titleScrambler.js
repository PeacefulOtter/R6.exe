if ( document.addEventListener ) {
  document.addEventListener( 'DOMContentLoaded', function() {
    loaded();
  } );
} else if ( document.attachEvent ) {
  document.attachEvent( 'onreadystatechange', function() {
    loaded();
  } );
}

function loaded() {
    setInterval( loop, 500 );
}

let x = 0;
let titleText = [
  '. . . e . . .', '. . ( e ) . .', '. ( ( e ) ) .', '( ( ( e ) ) )', '( ( . e . ) )', '( .  . e .  . )',
];

function loop() {
    document.getElementsByTagName( 'title' )[ 0 ].innerHTML = titleText[ x++ % titleText.length ];
}
