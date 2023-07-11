import axios from 'axios';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { URL_API } from '../pages/staff/components/ConstDefine';

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
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 5000);

      return () => {
        
        clearTimeout(timer);
      };
    }
  }, [showPopup]);

  return (
    <div className='thanks-main'>
      {createInvoice()}
      <div style={{height:'200px'}}></div>
      {showPopup && (
        <div className="popup-overlay">
            <div className="popup">
                <p>Thank you for choosing and trusting us. Wish you have a nice experience</p>
            </div>
        </div>
      )}
    </div>
  );
}
