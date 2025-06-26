import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HeaderCont from './components/HeaderCont';
import MainConts from './components/MainConts';
import VideoConts from './components/VideoConts';
import ChannelConts from './components/ChannelConts';
import SearchConts from './components/SearchConts';

function App() {
  return (
    <BrowserRouter>
      <HeaderCont />
      <Routes>
        <Route path='/' element={<MainConts />} />
        <Route path='/video/:id' element={<VideoConts />} />
        <Route path='/channel/:id' element={<ChannelConts />} />
        <Route path='/search/:searchTerm' element={<SearchConts />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
