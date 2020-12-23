import React from 'react';
import stamp from './stamp.png'

const Logo = ({onClick}) => {
  return (
    <div className='ma1 mt0' style={{ height: 64, width: 250 }}>
      <img className='pointer' alt='logo' src={stamp} onClick={onClick}/>
    </div>
  )
}

export default Logo;
