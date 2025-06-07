import React from 'react'
import { Link } from 'react-router-dom';

function NavForForms() {
  return (
    <>
    <div className="header__nav-style">
        <div className='header__nav--rowStyle'>
          <Link to="/" className="header__nav-skintric">SKINSTRIC</Link>
          <p className='header__nav-intro'>[ INTRO ]</p>
        </div>
        </div>
        <p className='header__navForm-analysisCopy'>TO START ANALYSIS</p>
    </>
  )
}

export default NavForForms;
