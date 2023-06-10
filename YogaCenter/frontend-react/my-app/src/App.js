import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navigation from './components/Navigation';

import './css/App.css';
import './css/home.css'
import Login from './components/Login';
import Home from './components/Home';
import Schedule from './components/Schedule';
import Footer from './components/Footer';
import RegisterClass from './components/RegisterClass';
import NavUsers from './pages/common/components/NavUsers'

function App() {
 

  return (
    <div className="App">
      <NavUsers/>
    {/* <Navigation/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/schedule' element={<Schedule/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/registerClass' element={<RegisterClass/>}/>
        <Route path='/schedule' element={<Schedule/>}/>
      </Routes>
     <Footer/> */}
    </div>
  
  );
  
}

export default App;
