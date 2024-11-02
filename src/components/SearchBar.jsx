import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
// import { ImSearch } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const onKeyPress = (e) => {
    if (e.charCode === 13) {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm('');
    }
  };

  return (
    <div className='search' onKeyPress={onKeyPress}>
      <label htmlFor='searchInput' className='search_label'>
        <FiSearch className='search_icon' /> 
      </label>
      <input
        type='text'
        id='searchInput'
        className='input_search'
        title='검색'
        placeholder='동영상을 찾아보세요.'
        onChange={(e) => setSearchTerm(e.target.value)}
      >
      </input>
    </div>
  )
}
