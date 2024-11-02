import React from 'react';
import { PiRabbit } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

export default function HeaderCont(props) {
  return (
    <header id='header' className='props'>
      <h1 className='logo'>
        <Link to='/'>
          <PiRabbit className='rabbit_icon'/>
          HONGTUBE
        </Link>
      </h1>
      <SearchBar />
    </header>
  )
}
