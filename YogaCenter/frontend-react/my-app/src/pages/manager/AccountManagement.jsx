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
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function AccountManagement() {
    const [accounts,setAccounts] = useState();
    const [change,setChange] = useState(false);
    const [search, setSearch] = useState({
        search: '',
        searchBy: ''
    });
    let getAllAccountsAPI = URL_API+`User/GetAllUser`;
    useEffect(()=>{
        axios.get(getAllAccountsAPI).then(r=>{setAccounts(r.data)
        setChange(false)}).catch(err=>console.log(err));
    },[change]) 

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
    event.preventDefault();
    };
    ///SearchFunction
    const searchHanlde = (e) => {
        setSearch(p => {
            return {
                ...search,
                [e.target.name]: e.target.value.toUpperCase().trim()
            }
        })
    };
    const searchSubmit = () => {
        var temp = [];
        if (search.search !== '' && search.searchBy === 'BYNAME') {
            accounts.forEach(account => {
                if (account.userName.toUpperCase().includes(search.search)) {
                    temp.push(account)
                }
                setAccounts(temp);
            });
        }

        if (search.search !== '' && search.searchBy === 'BYROLE') {
            accounts.forEach(account => {
                if (account.role !== null) {
                    if (account.role.roleName.toUpperCase().includes(search.search)) {
                        temp.push(account)
                    }
                    setAccounts(temp);
                }               
            });
        }
        if (search.search == '') {
            setChange(true);
        };
    }
    ////Submitdata
    function ChangeStatus(id){
        let changeStatusAPI = URL_API + `User/ChangeStatus/${id}`;
        axios.put(changeStatusAPI).then(r=>setChange(true)).catch(err => console.log(err));
    }
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
    <div className='Manage-class'>
        <div className='class-post'>
        <h1 className='staff-title'>Account Management </h1>
        <div className='staff-search-class'>
                        <TextField className='input-search' name='search' id="outlined-basic" label="Search" variant="outlined" onChange={searchHanlde} ></TextField>
                        <FormControl sx={{ width: '120px' }} className='form-choice-search' >
                            <InputLabel id="demo-simple-select-label">Search By</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Search By"
                                name='searchBy'
                                required
                                value={search.searchBy}
                                onChange={searchHanlde}
                            >
                                <MenuItem value={`BYNAME`}>User Name</MenuItem>
                                <MenuItem value='BYROLE'>Role</MenuItem>
                            </Select>
                        </FormControl>
                        <CustomButton sx={{ borderRadius: '20px', height: '50px' }} className='staff-button-search' variant="contained" onClick={searchSubmit} >Search</CustomButton>
                    </div>
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
                        {item.role.roleName !== 'Admin'?(
                        <td>{item.status=== 0? <CustomButton onClick={()=>ChangeStatus(item.id)}>Active</CustomButton>:<DeleteButton onClick={()=>ChangeStatus(item.id)} >Unactive</DeleteButton>}</td>
                        ):<td></td>}
                        </tr>
                    ))):''}
            </tbody>
        </table>
        </form>
        </div>
    </div>
    )
}
