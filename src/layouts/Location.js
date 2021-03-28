import React from 'react';
import MenuCol from '../components/MenuCol/index';
import './css/layouts.css';
import Loca from '../view/Location';

const Location = () =>{
  return(
    <div className='layout'>
      <MenuCol path='/location'/>
      <div className='content-page'>
        <div className='content'>
            <Loca/>
        </div>
      </div>
    </div>
  )
}

export default Location;