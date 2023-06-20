import React from "react";
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import Typography from '@mui/material/Typography';
import '../css/contact.css'
export default function Contact(){
    const InputCus = styled(TextField)`
    & .MuiInputBase-root{
        background-color: #e0d7df;
        border: 1px solid #6a526473;
        border-bottom: 1px solid #6a526473;
        border-radius: 2px;
    };
    & .MuiFilledInput-root:before{
        border-bottom: none;
    }; 
    & label.Mui-focused {
            color: #866077;
    };
    & .MuiFilledInput-root:after {
          
            border-bottom:1px solid #7e404b;
        }
`;
    return(
        <div className="contact">
            <Box  className="box-container">
                <Grid container justifyContent="center" alignItems="center" sx={{height:'100%',backgroundColor:'#e0d7df',borderRadius:'35px'}}>
                    <Grid className="contact-detail" item xs={6} md={5} sx={{position:'relative', height:'100%', backgroundImage: 'linear-gradient(180deg, #d69bd440,#ffffff9e), url(./assets/images/contact-img.jpg)', backgroundSize: 'cover',backgroundPosition: 'center',borderRadius: '35px 0 0 35px'}}>
                        <div className="inf-customer-contact">
                            <Typography variant="h4" >FPTU Yoga</Typography>
                            <Typography variant="subtitle1">FPTU Yoga fosters and empowers personal well-being and mindfulness through a dedicated practice built on ancient traditions and modern techniques.</Typography>
                            <ul className="contact-social">
                                <a href="https://www.facebook.com/hniv.gnauqnart" target="_blank" rel="noopener noreferrer"><li><FacebookIcon sx={{fontSize:"3em",padding:'10px'}} ></FacebookIcon></li></a>
                                <a href="https://www.instagram.com/qng.vin" target="_blank" rel="noopener noreferrer"><li>  <InstagramIcon sx={{fontSize:"3em",padding:'10px'}} ></InstagramIcon></li></a>
                                <a><li>   <TwitterIcon sx={{fontSize:"3em",padding:'10px'}} ></TwitterIcon></li></a>
                                <a><li> <PhoneEnabledIcon  sx={{fontSize:"3em",padding:'10px'}}></PhoneEnabledIcon></li></a>
                            </ul>
                        </div>
                    </Grid>
                    <Grid  className="feedback-container" item xs={6} md={7}>
                        <div className="feedback-detail">
                            <div className="feedback-title">
                                <h1>Get it touch</h1>
                                <p> We will answer your questions and problems</p>
                            </div>
                            <div className="form-feedback" style={{ display: 'flex', flexDirection: 'column' }}>
                                <Grid className="inf-customer-feedback" style={{ flex: '1' }}>
                                    <InputCus
                                        id="filled-read-only-input"
                                        label="First Name"
                                        variant="filled"
                                        sx={{width:'47%'}}
                                        style={{ flex: '0 0 auto' }}
                                        />
                                    <InputCus
                                        id="filled-read-only-input"
                                        label="Last Name"
                                        variant="filled"
                                        sx={{width:'47%'}}
                                        style={{ flex: '0 0 auto' }}
                                        />
                                </Grid>
                                    <InputCus
                                        id="filled-read-only-input"
                                        label="Email"
                                        sx={{width:'100%',margin: '5px 0'}}
                                        variant="filled"
                                        style={{ flex: '0 0 auto' }}
                                        />
                                    <InputCus
                                        id="filled-read-only-input"
                                        label="Phone"
                                        sx={{width:'100%',margin: '5px 0'}}
                                        variant="filled"
                                        style={{ flex: '0 0 auto' }}
                                        />
                                    <InputCus
                                        id="filled-multiline-static"
                                        label="Describe your issue"
                                        multiline
                                        rows={4}
                                        variant="filled"
                                        sx={{width:'100%',margin: '5px 0'}}
                                        style={{ flex: '0 0 auto' }}
                                        />
                                <Button sx={{width:'100%',height:'4em',backgroundColor:'#d49aa5',marginTop:'1.5em'}} variant="contained">Feedback</Button>
                            </div>
                        </div>
                    </Grid>
                    
                </Grid>
            </Box>
        </div>
    )
}