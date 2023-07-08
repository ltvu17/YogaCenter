import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectRouteManager({user,children}) {
    try{
    if(user.toUpperCase().trim().localeCompare('"MANAGER"', undefined, { sensitivity: 'base' }) === 0){
        return children
    }
    if(user.toUpperCase().trim().localeCompare('"ADMIN"', undefined, { sensitivity: 'base' }) === 0){
        return children
    }
}catch{
    return <Navigate to="/"/>
}
  return <Navigate to="/"/>
}