import React from "react";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import '../css/profile.css'

export default function Profile() {
    return (
        <div className="profile" >
            <div className="profile-content">
                <Grid container sx={{width:'500px'}}>
                    <Grid  xs={12}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </Grid>
                    <Grid  xs={6}>
                    <TextField id="standard-basic" label="Standard" variant="standard" />
                    </Grid>
                    <Grid  xs={6}>
                        
                    </Grid>
                    <Grid  xs={6}>
                      
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
