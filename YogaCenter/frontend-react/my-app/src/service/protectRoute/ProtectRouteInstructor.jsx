import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectRouteInstructor({user,children}) {
    try{
    if(user.toUpperCase().trim().localeCompare('"TEACHER"', undefined, { sensitivity: 'base' }) === 0){
        return children
    }
}catch{
    return <Navigate to="/"/>
}
  return <Navigate to="/"/>
}