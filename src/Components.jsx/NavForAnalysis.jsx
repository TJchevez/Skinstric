import React from 'react'
import { Link } from 'react-router-dom';

function NavForAnalysis() {
  return (
    <>
    <div className="header__nav-style">
        <div className='header__nav--rowStyle'>
          <Link to="/" className="header__nav-skintric">SKINSTRIC</Link>
          <p className='header__nav-intro'>[ ANALYSIS ]</p>
        </div>
        </div>
          <div>
          <h1 className='header__navForm-analysisCopy'>A.I ANALYSIS</h1>
          </div>
    </>
  )
}

export default NavForAnalysis;