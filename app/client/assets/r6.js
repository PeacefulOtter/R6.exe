
let r6form         = document.getElementById( 'r6-form' )
let radiosPlatform = document.getElementsByClassName( 'radio-input' )
let r6Input        = document.getElementById( 'r6-input' )
let r6Btn          = document.getElementById( 'r6-btn' )

let imageDiv       = document.getElementById( 'r6-image-container' )
let r6Images       = document.getElementsByClassName( 'r6-image' )

let loadingDiv     = document.getElementById( 'loading' )


r6Input.addEventListener( 'input', ( event ) => {
  let val = r6Input.value.trim()
  if ( val == '' ) {
    r6Input.style.color       = 'var(--mintext)'
    r6Input.style.borderColor = 'var(--highlight)'
  }
  else if ( val ) {
    r6Input.style.color       = 'var(--highlight2)'
    r6Input.style.borderColor = 'var(--highlight2)'
  }
} )


document.onkeydown = function( e ) { if ( e.keyCode == 13 ) { retrieveR6Stats() } }


function retrieveR6Stats() {

  let username = r6Input.value;
  if ( username.trim() == '' ) {
    return Swal.fire( {
      position: 'top-end',
      type: 'warning',
      title: 'Username is missing',
      showConfirmButton: false,
      timer: 1500
    } )
  }

  let platform = null
  for ( let i = 0; i < radiosPlatform.length; i++ ) {
    if ( radiosPlatform[ i ].checked ) {
      platform = radiosPlatform[ i ].value
    }
  }
  if ( platform == null ) {
    return Swal.fire( {
      position: 'top-end',
      type: 'warning',
      title: 'You need to choose a platform',
      showConfirmButton: false,
      timer: 1500
    } )
  }

  r6form.classList.add( 'hide' )
  loadingDiv.classList.remove( 'hide' )

  window.location.href = `http://localhost:5000/stats/r6/${platform}/${username}`
}
