import React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import { useCookies } from "react-cookie";
import '../css/customerCare.css'
import RegisterAccountCustomer from "../pages/customer/components/RegisterAccountCustomer";
import RegisClasForm from '../pages/customer/components/RegisClassForm';
import CloseIcon from '@mui/icons-material/Close';
const CustomerCarePopup = ({ onClose, courseId }) => {
  const [cookies] = useCookies(["userId"]);
  const userId = cookies.userId;
  const handleRegistrationSuccess = () => {
    onClose();
  };
  return (
    <div className="customer-care-popup">
      <Grid container className="popup-container" sx={{width: '70%',
    backgroundColor: '#7e825d',
    height: '70%',position:'relative',borderRadius: '18px',    boxShadow: '0px 0px 9px -3px #111105'}}>
        <Grid item md={6}>
          <div className="customer-care-content" style={{    padding: '0px 40px'}}>
            <h1 style={{fontSize:'3.3rem',color: '#d3c809'}}>YOGA FPTU</h1>
            <h1 style={{fontSize:'2.1rem',    color: 'wheat'}}>
              Embrace Health and Happiness.
              <br />
              Experience it now!
            </h1>
            <p style={{    fontSize: '1.2rem',
    color: 'white',
    padding: '28px 0 0 0'}}>
              Take the time to nurture yourself and explore the hidden potential
              within you through yoga. Let us accompany you on this journey and
              provide you with memorable experiences and great benefits for your
              physical and mental well-being.
            </p>
          </div>
        </Grid>
        {userId === undefined ? (
          <Grid item md={6} id="registerAccount">
            <RegisterAccountCustomer  onRegistrationSuccess={handleRegistrationSuccess}/>
            
          </Grid>
        ) : (
          <Grid item md={6} id="registerClass">
            <RegisClasForm courseId={courseId}/>
          </Grid>
        )}
        <CloseIcon sx={{position:'absolute',top:'0',right:'0',   
    padding: '10px',fontSize:'3rem',cursor:'pointer'}} onClick={onClose}></CloseIcon>
      </Grid>
    </div>
  );
};

export default CustomerCarePopup;
