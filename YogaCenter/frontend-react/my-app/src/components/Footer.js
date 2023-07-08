import React from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import { styled } from '@mui/system';
import '../css/footer.css'
export default function Footer(){
    const Facebook = styled(FacebookIcon)`
        color: white;
        font-size: 40px;
       margin-top: 10px;
       margin-left: 20px;
`;
const Mail = styled(EmailRoundedIcon)`
    color: white;
        font-size: 40px;
        margin-top: 10px;
        margin-left: 20px;
`;

    return(
        <div className="footer">
         
        <div className="main-footer">
            <div className="footer-inf"> 
                <h1>YOGA FPTU</h1>
                <ul>
                    <li><a href="tel: 0123456789"><PhoneRoundedIcon fontSize="small" className="footer-inf-icon"></PhoneRoundedIcon>0123456789</a></li>
                    <li><p><FmdGoodRoundedIcon fontSize="small"  className="footer-inf-icon"></FmdGoodRoundedIcon>Đường D1, Phường Long Thạnh Mỹ, Quận Thủ Đức</p></li>
                    <li><p><AccessTimeRoundedIcon fontSize="small"  className="footer-inf-icon"></AccessTimeRoundedIcon>Thứ hai - Chủ nhật: 5:00 - 22:00</p></li>
                </ul>
            </div>
            <div className="footer-social">
                <h1>Social network</h1>
                <Facebook></Facebook>
                <Mail></Mail>
            </div>
        </div>
            <div className="end-footer">
            <p>© Yoga FPTU center 2023</p>
            </div>
           
        </div>
    )
}