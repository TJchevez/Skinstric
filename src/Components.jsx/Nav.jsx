import React from 'react'
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div className="header__nav-style">
        <div className='header__nav--rowStyle'>
         <Link to="/" className="header__nav-skintric">SKINSTRIC</Link>
          <p className='header__nav-intro'>[ INTRO ]</p>

        </div>
          <button className='header__nav-button'>ENTER CODE</button>
        </div>
  )
}

export default Nav;
