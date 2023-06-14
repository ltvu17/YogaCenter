import React from 'react';
import { Route, Routes} from 'react-router-dom';
import Navigation from './components/Navigation';
import { useCookies } from 'react-cookie';
import './css/App.css';
import './css/home.css'
import Login from './components/Login';
import Home from './components/Home';
import Schedule from './components/Schedule';
import Footer from './components/Footer';
import RegisterClass from './components/RegisterClass';
import NavUsers from './pages/common/components/NavUsers'
import HomeCustomer from './pages/customer/components/homeCustomer';

import StaffManager from './pages/staff/components/StaffManager';
import Redirect from './pages/Redirect';

import Notification from './pages/customer/components/Notification';
import ScheduleCustomer from './pages/customer/components/ScheduleCustomer';

function App() {
 
  try {
  const[roleCookie,setCookie]= useCookies(['']);
  var roleApp = JSON.stringify(roleCookie.Role);
} catch(err){

}

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
     
        <Route path='/NavUsers' element={<NavUsers/>}/>
        <Route path='/Redirecting' element={<Redirect/>} />
        <Route path='/StaffManager' element={<StaffManager/>} />
        <Route path='home-customer' element={<HomeCustomer/>} />
        {/* <Route path="/notification" element={<Notification/>} /> */}
        <Route path='/customer-schedule' element={<ScheduleCustomer/>}/>
      </Routes>   

     <Footer/>   
     </div>
  
  );
  
}

export default App;
