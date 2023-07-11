import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectRouteThanks({status,children}) {
    try{
    if(status !== undefined){
        return children
    }
}catch{
    return <Navigate to="/"/>
}
  return <Navigate to="/"/>
}