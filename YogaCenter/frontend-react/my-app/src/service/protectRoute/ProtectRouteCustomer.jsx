import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectRouteCustomer({user,children}) {
    try{
    if(user.toUpperCase().trim().localeCompare('"CUSTOMER"', undefined, { sensitivity: 'base' }) === 0){
        return children
    }
}catch{
    return <Navigate to="/"/>
}
  return <Navigate to="/"/>
}
