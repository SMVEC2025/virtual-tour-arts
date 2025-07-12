import React from 'react'

function NavBar() {
  return (
    <div className='nav-main'>
      <div className='left'>
        <img src={'/logo.png'} alt="" />
      </div>
      <div className='right'>
        <button>Exit</button>
        <button>Visit SMVEC</button>
      </div>
    </div>
  )
}

export default NavBar
