import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { URL_API,notification } from './ConstDefine';

export default function NotificationSend() {
    const [sendPost,setSendPost] = useState();
    ///URP_API
    let getSendPostAPI = URL_API +`UserNotification/`+notification;
    useEffect(()=>{
        axios.get(getSendPostAPI).then(r=>setSendPost(r.data)).catch(err => console.log(err));
    },[]);
    console.log(sendPost);
    function filterDate(time){
        const split = time.split("T");
        let value = split[0];
        return value;
      }
    return (
    <div>
    <table>
        <thead>
            <tr>
                <th>Index</th>
                <th>Title</th>
                <th>Desctiption</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
            {sendPost?sendPost.map((item,index) =>(
                <tr key={index}>
                    <td>{index +1}</td>
                    <td>{item.notification.title}</td>
                    <td><textarea disabled maxLength={20}>{item.notification.detail}</textarea></td>
                    <td>{filterDate(item.daycreate)}</td>
                </tr>
            )

            ):<tr></tr>}
          
        </tbody>
    </table>
    
    </div>
    )
}
