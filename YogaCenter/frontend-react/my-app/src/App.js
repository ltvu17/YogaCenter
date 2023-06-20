import React from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import { useCookies } from "react-cookie";
import "./css/App.css";
import "./css/home.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Schedule from "./components/Schedule";
import Footer from "./components/Footer";
import RegisterClass from "./components/RegisterClass";
import NavUsers from "./pages/common/components/NavUsers";
import HomeCustomer from "./pages/customer/components/homeCustomer";
import StaffManager from "./pages/staff/components/StaffManager";
import Redirect from "./pages/Redirect";
import Staffmanage from "./pages/staff/components/Staffmanage";
import UpdateClass from "./pages/staff/components/UpdateClass";
import Notification from "./pages/customer/components/Notification";
import ScheduleCustomer from "./pages/customer/components/ScheduleCustomer";
import ProfileCustomer from "./pages/customer/components/ProfileCustomer";
import StudentManage from "./pages/staff/components/StudentManage";
import ScheduleManage from "./pages/staff/components/ScheduleManage";
import ConstDefine from "./pages/staff/components/ConstDefine";
import AddClassSchedule from "./pages/staff/components/AddClassSchedule";

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
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registerClass" element={<RegisterClass />} />

        <Route path="/schedule" element={<Schedule />} />
        {/* <Route path='/NavUsers' element={<NavUsers/>}/> */}
        <Route path="/Redirecting" element={<Redirect />} />
        {/* <Route path='/StaffManager' element={<StaffManager/>} /> */}
        <Route path='/staffmanage' element={<Staffmanage/>} />
        <Route path='/home-customer' element={<HomeCustomer/>} />
        <Route path='/Profile' element={<ProfileCustomer/>} />
        <Route path='/customer-schedule' element={<ScheduleCustomer/>}/>
        <Route path='/studentmanage' element={<StudentManage/>}/>
        <Route path='/schedulemanage' element={<ScheduleManage/>}/>
        <Route path='/addclassschedule' element={<AddClassSchedule/>}/>
        {/* <Route path='/const' element={<ConstDefine/>}/> */}
        {/* <Route path='/updateClass:id' element={<UpdateClass/>} /> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
