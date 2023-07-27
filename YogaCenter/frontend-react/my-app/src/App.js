
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
import ForgotPassword from './components/ForgotPassword';

import AccountManagement from './pages/manager/AccountManagement';
import ProtectRouteCustomer from './service/protectRoute/ProtectRouteCustomer';
import ProtectRouteInstructor from './service/protectRoute/ProtectRouteInstructor';
import ProtectRouteStaff from './service/protectRoute/ProtectRouteStaff';
import ProtectRouteAdmin from './service/protectRoute/ProtectRouteAdmin';

import Blog from './components/Blog';
import ProtectRouteManager from './service/protectRoute/ProtectRouteManager';
import BlogDetail from './components/BlogDetail';
import Thanks from './components/Thanks';
import ProtectRouteThanks from './service/protectRoute/ProtectRouteThanks';
// import Bloges from './data/ListOfBlog'

function App() {
  try {
    const [roleCookie, setCookie] = useCookies([""]);
    var roleApp = JSON.stringify(roleCookie.Role);
    var status = JSON.stringify(roleCookie.timeout)

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
        <Route path="/blog-detail/:slug" element={<BlogDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registerClass" element={<RegisterClass/>} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/thanks" element={<ProtectRouteThanks status={status} children={<Thanks/>}></ProtectRouteThanks>} />
        <Route path="/contact" element={<ProtectRouteCustomer user={roleApp} children={<Contact/>}></ProtectRouteCustomer>} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />
        <Route path='/thanks' element={<Thanks/>} />
        {/* <Route path="/test" element={<Bloges/>} /> */}
        {/* Customer */}
        <Route path='/customer-class' element={<ProtectRouteCustomer user={roleApp} children={<ClassCustomer/>}></ProtectRouteCustomer>}/>
        <Route path='/home-customer' element={<ProtectRouteCustomer user={roleApp} children={<HomeCustomer/>}></ProtectRouteCustomer>} />
        <Route path='/profile-customer' element={<ProtectRouteCustomer user={roleApp} children={<ProfileCustomer/>}></ProtectRouteCustomer>} />
        <Route path='/customer-schedule' element={<ProtectRouteCustomer user={roleApp} children={<ScheduleCustomer/>}></ProtectRouteCustomer>}/>
        <Route path='/notification' element={<ProtectRouteCustomer user={roleApp} children={<Notification/>}></ProtectRouteCustomer>}/>

        {/* Instructor */}
        <Route path='home-instructor' element={<ProtectRouteInstructor user={roleApp} children={<HomeInstructor/>}></ProtectRouteInstructor>} />
        <Route path='/profile-instructor' element={<ProtectRouteInstructor user={roleApp} children={<ProfileInstructor/>}></ProtectRouteInstructor>} />
        <Route path='/class-instructor' element={<ProtectRouteInstructor user={roleApp} children={<ClassInstructor/>}></ProtectRouteInstructor>}/>
        <Route path='/schedule-instructor' element={<ProtectRouteInstructor user={roleApp} children={<ScheduleInstructor/>}></ProtectRouteInstructor>}/>

        {/* <Route path='/StaffManager' element={<StaffManager/>} /> */}
        <Route path='/homestaff' element={<ProtectRouteStaff user={roleApp} children={<HomeStaff/>}></ProtectRouteStaff>} />
        <Route path='/staffmanage' element={<ProtectRouteStaff user={roleApp} children={<Staffmanage/>}></ProtectRouteStaff>} />
        <Route path='/studentmanage' element={<ProtectRouteStaff user={roleApp} children={<StudentManage/>}></ProtectRouteStaff>}/>
        <Route path='/schedulemanage' element={<ProtectRouteStaff user={roleApp} children={<ScheduleManage/>}></ProtectRouteStaff>}/>
        <Route path='/addclassschedule' element={<ProtectRouteStaff user={roleApp} children={<AddClassSchedule/>}></ProtectRouteStaff>}/>
        <Route path='/coursemanage' element={<ProtectRouteManager user={roleApp} children={<CourseManage/>}></ProtectRouteManager>}/>
        <Route path='/eventmanage' element={<ProtectRouteManager user={roleApp} children={<EventManage/>}></ProtectRouteManager>}/>
        <Route path='/staff-registerAccount' element={<ProtectRouteStaff user={roleApp} children={<RegisterAccount/>}></ProtectRouteStaff>}/>
        <Route path='/register-teacher' element={<ProtectRouteManager user={roleApp} children={<RegisterTeacher/>}></ProtectRouteManager>}/>
        <Route path='/create-invoice' element={<ProtectRouteStaff user={roleApp} children={<CreateInvoice/>}></ProtectRouteStaff>}/>
        <Route path='/staff-notification' element={<ProtectRouteStaff user={roleApp} children={<NotificationStaff/>}></ProtectRouteStaff>}/>

        <Route path='/account-manage' element={<ProtectRouteAdmin user={roleApp} children={<AccountManagement/>}></ProtectRouteAdmin>}/>
        {/* ADMIN */}
        <Route path='/dashboard' element={<ProtectRouteAdmin user={roleApp} children={<Dashboard/>}></ProtectRouteAdmin>} />
        {/* <Route path='/const' element={<ConstDefine/>}/> */}
        {/* <Route path='/updateClass:id' element={<UpdateClass/>} /> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
