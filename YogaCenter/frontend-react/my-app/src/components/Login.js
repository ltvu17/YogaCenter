import React from 'react'
import Navigation from './Navigation'

export default function Login(){
    return(
        <div>
       
        <form className='login'>
            <h1>Login</h1>
            <label>Username</label>
            <input type='text'/>  
            <label>Password</label>
            <input type='password'/>  
        </form>
        </div>
    )
}