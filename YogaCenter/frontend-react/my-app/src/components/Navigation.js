import React from 'react'
import {Link} from 'react-router-dom'
import '../css/navigation.css'


export default function Navigation(){

  return(
    <nav className='Navigation'>
      <Link to='/' className='logo'>
        <h1>Yoga FPTU Center</h1>
        <p>EVERY DAY</p>
      </Link>
    <ul className='nav'>
      <li><Link to='/home'>Home</Link></li>
      <li><Link to='#'>Blog</Link></li>
      <li><Link to='#'>Schedule</Link></li>
      <li><Link to='/login'>Login</Link></li>
    </ul>
    </nav>
 
  )
}

  