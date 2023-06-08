
import Navigation from './Navigation'
import React, {useState} from 'react';
import Button from '@mui/material/Button';

export default function Login(){
    const [posts, setPost] = useState([]);
  function getlogin(){
    const url = 'https://localhost:7096/api/User/Login';
    fetch(url, {
      method: "GET",
      headers:{
        'userName': 'Tin@gmail.com',
        'userPasswork': '123'
      }
    }).then(r => r.json()).then(p=> {
      setPost(p);
      console.log(p);
    })

  }
    return(
        <div>
       
        <form className='login'>
           <h1>Login</h1>
        <p>Username</p>
        <input type='text' name='Username' value={posts.userName}></input>
        <p>Passwork</p>
        <input type='password' name='Passwork' value={posts.userPasswork}></input>
      <br></br>
      <Button onClick={getlogin} variant="contained" name='submit'>Login</Button>
        </form>
        </div>
    )
}