import axios from 'axios';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { URL_API } from '../pages/staff/components/ConstDefine';
import '../css/thank.css'
import { Grid, Typography } from '@mui/material';

export default function Thanks() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const [user] = useCookies();
  const [customer,setCustomer] = useState([]);
  const navigate = useNavigate();
  let customerAPI = URL_API + `Customer/${user.userId}`
  const [showPopup, setShowPopup] = useState(true);
  let postInvoiceAPI = URL_API+`Invoice/VNPay`
  function filterDay(day){
    const split = day.split("T");
    let value = split[0];
    return value;
  }
  var date = (new Date).toISOString();
  useEffect(() => {
    axios.get(customerAPI).then(r => setCustomer(r.data)).catch(err=> console.log(err));
  }, []);
    function createInvoice(){
        if(params.get("vnp_TransactionStatus") === '00'){
          axios.post(postInvoiceAPI,{
            dateRequest : filterDay(date),
            datePay : filterDay(date),
            note : params.get("vnp_TransactionNo"),
            totalPay : params.get("vnp_Amount")/100,
          },{
            headers: {
              customerId : customer.id,
              courseId: params.get("vnp_OrderInfo"),
          }}).catch(err => console.log(err));
        } 
        else{
          navigate("/registerClass");
        }
      }   
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/');
    }, 6000);

    return () => {
      clearTimeout(timeout);
    };
  }, [navigate]);
  
  return (
    <Grid container md={12} className='thanks-main'>
       {createInvoice()}
      <Grid item md={6} className='thanks-title' sx={{marginTop: '5%',
                                                      padding: '3%'}}>
        <Typography variant='h1'>Thank you for choosing and trusting us</Typography>
        <Typography variant='subtitle1'>Wish you have a nice experience</Typography>
      </Grid>
      <Grid item md={6} className='item-thanks'>
        <img src='assets/images/item-thanks.png' />
      </Grid>
    </Grid>

  );
};

