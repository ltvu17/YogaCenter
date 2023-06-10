import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Input } from '@mui/material';
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';
import '../css/registerClass.css'
import { courses } from '../data/ListOfCourses';
const ariaLabel = { 'aria-label': 'description' };
export default function RegisterClass(){
    const [Class, setClass] = useState([])
    const InputCus = styled(Input)`
    &:after{
     border-bottom: 2px solid #951a3b;
   }`
   ;
  return(
    <div className='register-class'>
     <Grid container className="customer-care" pt='66px' style={{ backgroundImage: "url('/assets/images/customer-care.png')" }}>
          <Grid item md={6}>
            <div className="customer-care-content">
              <h1 style={{ color: "#d2608d", marginBottom: "0" }}>YOGA FPTU</h1>
              <h1>
                Embrace Health and Happiness.
                <br />
                Experience it now!
              </h1>
              <p>
                Take the time to nurture yourself and explore the hidden
                potential within you through yoga. Let us accompany you on this
                journey and provide you with memorable experiences and great
                benefits for your physical and mental well-being.
              </p>
            </div>
          </Grid>
          <Grid item md={6}>
            <ul className="customer-formRegister">
              <li>
                 <InputCus className="customer-input" placeholder="Họ và tên" inputProps={ariaLabel}/>
              </li>
              <li>
                <InputCus className="customer-input" placeholder="Số điện thoại" inputProps={ariaLabel}/>
              </li>
              <li>
                <InputCus className="customer-input" placeholder="Email" inputProps={ariaLabel}/>
              </li>
              <li>
                <InputCus className="customer-input" placeholder="Thành Phố" inputProps={ariaLabel}/>
              </li>
              <li>
                <Button variant="contained">Register</Button>
              </li>
            </ul>
          </Grid>
    </Grid>
    <div className='classList'>
        <div className='classList-title'>
            <p>Confidence and Serenity with Yoga</p>
            <h1>Explore Our Yoga Class Offerings</h1>
        </div>    
        <Grid container ml={10} mr={10} mt={10} className="classList-detail">
            {courses.map((coursesDetail) => (
            <Grid key={coursesDetail.id} item md={4} pb='50px' style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}> 
                    <Card sx={{ maxWidth: 300, height: "100%", border: "1px solid #b09999", borderRadius:"20px", boxShadow: "1px 1px 11px -1px #7f5188d6", backgroundColor: "#f9effa" }}>
                        <CardMedia component="img" height="200" image={coursesDetail.img} />
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{coursesDetail.type}</Typography>
                            <Typography gutterBottom variant="h5" component="div">{coursesDetail.name}</Typography>
                            <Typography variant="body2" color="text.secondary">{coursesDetail.inf}</Typography>
                        </CardContent>
                        <CardActions className='buttonCard' style={{ justifyContent: 'flex-end' }}>
                            <Button variant='contained' size="small">Register</Button>
                        </CardActions>
                    </Card>
                </div>
            </Grid>
            ))}
        </Grid>

    </div>
</div>
)
}

