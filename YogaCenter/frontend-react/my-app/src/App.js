
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
import Staffmanage from './pages/staff/components/Staffmanage';
import UpdateClass from './pages/staff/components/UpdateClass';
import Notification from './pages/customer/components/Notification';
import ScheduleCustomer from './pages/customer/components/ScheduleCustomer';
import ClassCustomer from './pages/customer/components/ClassCustomer';
import ProfileCustomer from './pages/customer/components/ProfileCustomer';
import StudentManage from './pages/staff/components/StudentManage';
import ScheduleManage from './pages/staff/components/ScheduleManage';
import ConstDefine from './pages/staff/components/ConstDefine';
import AddClassSchedule from './pages/staff/components/AddClassSchedule';
import CourseManage from './pages/manager/CourseManage';
import EventManage from './pages/manager/EventManage';

import Contact from './pages/common/components/Contact';
import RegisterAccount from './pages/staff/components/RegisterAccount';
import RegisterTeacher from './pages/manager/RegisterTeacher';
import CreateInvoice from './pages/staff/components/CreateInvoice';
import NotificationStaff from './pages/staff/components/NotificationStaff';

import HomeInstructor from './pages/instructor/components/HomeInstructor';
import ProfileInstructor from './pages/instructor/components/ProfileInstructor'
import ClassInstructor from './pages/instructor/components/ClassInstructor';
import ScheduleInstructor from './pages/instructor/components/ScheduleInstructor';
import Dashboard from './pages/admin/components/Dashboard';
import HomeStaff from './pages/staff/components/HomeStaff';

import AccountManagement from './pages/manager/AccountManagement';

import Blog from './components/Blog';

function App() {
  try {
    const [roleCookie, setCookie] = useCookies([""]);
    var roleApp = JSON.stringify(roleCookie.Role);
  } catch (err) {}

  return (
    <div className="App">
      {/* <NavUsers/>  */}
      <Navigation role={roleApp} />
      <Routes>
        <Route path="/Redirecting" element={<Redirect />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registerClass" element={<RegisterClass />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/contact" element={<Contact/>} />

        {/* Customer */}
        <Route path='/customer-class' element={<ClassCustomer/>}/>
        <Route path='/home-customer' element={<HomeCustomer/>} />
        <Route path='/profile-customer' element={<ProfileCustomer/>} />
        <Route path='/customer-schedule' element={<ScheduleCustomer/>}/>

        {/* Instructor */}
        <Route path='home-instructor' element={<HomeInstructor/>} />
        <Route path='/profile-instructor' element={<ProfileInstructor/>} />
        <Route path='/class-instructor' element={<ClassInstructor/>}/>
        <Route path='/schedule-instructor' element={<ScheduleInstructor/>}/>

        {/* <Route path='/StaffManager' element={<StaffManager/>} /> */}
        <Route path='/homestaff' element={<HomeStaff/>} />
        <Route path='/staffmanage' element={<Staffmanage/>} />
        <Route path='/studentmanage' element={<StudentManage/>}/>
        <Route path='/schedulemanage' element={<ScheduleManage/>}/>
        <Route path='/addclassschedule' element={<AddClassSchedule/>}/>
        <Route path='/coursemanage' element={<CourseManage/>}/>
        <Route path='/eventmanage' element={<EventManage/>}/>
        <Route path='/staff-registerAccount' element={<RegisterAccount/>}/>
        <Route path='/register-teacher' element={<RegisterTeacher/>}/>
        <Route path='/create-invoice' element={<CreateInvoice/>}/>
        <Route path='/staff-notification' element={<NotificationStaff/>}/>

        <Route path='/account-manage' element={<AccountManagement/>}/>
        {/* ADMIN */}
        <Route path='/dashboard' element={<Dashboard/>} />
        {/* <Route path='/const' element={<ConstDefine/>}/> */}
        {/* <Route path='/updateClass:id' element={<UpdateClass/>} /> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
