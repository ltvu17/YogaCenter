import React, { useEffect, useState } from 'react'
import { URL_API } from '../staff/components/ConstDefine';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';

export default function AccountManagement() {
    const [accounts,setAccounts] = useState();
    let getAllAccountsAPI = URL_API+`User/GetAllUser`;
    useEffect(()=>{
        axios.get(getAllAccountsAPI).then(r=>setAccounts(r.data)).catch(err=>console.log(err));
    },[]) 

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
    event.preventDefault();
    };
    const CustomButton = styled(Button)`
         background-color: #010f51b8;
      font-family: arial;
      color: white;
      border-radius: 35px;
      height: 50px;
      font-weight: 500;

   
      &:hover {
        background-color: #27212552;
      }
    `;
    const DeleteButton = styled(Button)`
       background-color: #a70707;
     font-family: arial;
     color: white;
     border-radius: 35px;
     height: 50px;
     font-weight: 500;

  
     &:hover {
        background-color: #ff353587;
     }
   `;
    return (
    <div>
        <form>
        <table className='table-add-class'>
            <thead>
                <tr>
                <th>Index</th>
                <th>User Name</th>
                <th>User Password</th>
                <th>Active</th>
                <th>Role</th>      
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {accounts? accounts.map(((item, index) =>(
                        <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.userName}</td>
                        <td><InputLabel htmlFor="outlined-adornment-password"></InputLabel>
                            <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            defaultValue={item.userPasswork}
                            readOnly
                            endAdornment={
                            <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label="Password"
                        /></td>
                        <td>{item.status=== 1? 'Active':'Unactive'}</td>
                        <td>{item.role.roleName}</td>
                        <td>{item.status=== 0? <CustomButton>Active</CustomButton>:<DeleteButton>Unactive</DeleteButton>}</td>
                        </tr>
                    ))):''}
            </tbody>
        </table>
        </form>
        
    </div>
    )
}
