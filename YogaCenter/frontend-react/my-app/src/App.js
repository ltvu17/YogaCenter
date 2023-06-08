import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import './css/App.css';
import './css/home.css'
import Login from './components/Login';
import Home from './components/Home';

import Footer from './components/Footer';
function App() {
 

  return (
    <div className="App">
     
     <Navigation/>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/'element={<Home />} />
        <Route path='/home'element={<Home />} />
      </Routes>
     <Footer/>
    </div>
  );
}

export default App;
