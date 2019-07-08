
let pos    = 0
let layers = document.getElementsByClassName( 'wrapper' )
let tabs   = document.getElementsByClassName( 'tab' )


function scrollTo( p ) {
  if ( p == pos ) return

  tabs[ pos ].classList.remove( 'selected-menu' )
  tabs[ p ].classList.add( 'selected-menu' )

  this.pos = pos
  this.p = p

  this.sleepwhileForward = function() {
    if ( this.p > this.pos ) {
      layers[ this.pos ].classList.add( 'slideDisappearRight' )
      this.pos++
      layers[ this.pos ].classList.remove( 'slideDisappearRight' )
      setTimeout( function() { this.sleepwhileForward() }, 400 )
    } else {
      return
    }
  }

  this.sleepwhileBackward = function() {
    if ( this.pos > this.p ) {
      layers[ this.pos ].classList.remove( 'slideDisappearRight' )
      this.pos--
      layers[ this.pos ].classList.remove( 'slideDisappearRight' )
      setTimeout( function() { this.sleepwhileBackward() }, 400 )
    } else {
      return
    }
  }

  if ( this.p > this.pos ) {
    this.sleepwhileForward()
  } else if ( this.pos > this.p ) {
    this.sleepwhileBackward()
  }

  pos = p
}


function isNumber( n ) {
  return !isNaN( parseFloat( n ) ) && isFinite( n )
}

window.onpopstate = function( event ) {
  let loc = window.location
  let url = loc.href
  let identifier = url.replace( loc.origin + loc.pathname + '#', '' )
  if ( isNumber( identifier ) ) {
    scrollTo( parseInt( identifier ) )
  }
}
