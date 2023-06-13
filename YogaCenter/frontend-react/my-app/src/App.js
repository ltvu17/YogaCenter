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
import HomeCustomer from './pages/customer/components/homeCustomer';
import Profile from './pages/common/components/Profile';
import StaffManager from './pages/staff/components/StaffManager';
import Redirect from './pages/Redirect';
import { useCookies } from 'react-cookie';

function App() {
  const[roleCookie,setCookie]= useCookies(['']);
  let roleApp = JSON.stringify(roleCookie.Role);

  return (
    <div className="App">
       {/* <NavUsers/>  */}
    <Navigation role={roleApp}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/schedule' element={<Schedule/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/registerClass' element={<RegisterClass/>}/>
        <Route path='/schedule' element={<Schedule/>}/>
        <Route path='/NavUsers' element={<NavUsers/>}/>
        <Route path='/Redirecting' element={<Redirect/>} />
        <Route path='/StaffManager' element={<StaffManager/>} />
        <Route path='/HomeCustomer' element={<HomeCustomer/>} />
        <Route path='/Profile' element={<Profile/>} />
      </Routes>
     <Footer/>
    </div>
  
  );
  
}

export default App;
