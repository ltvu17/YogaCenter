import axios from "axios";
import { useEffect, useState } from "react";
import React from 'react'
import CryptoJS from "crypto-js";

export const URL_API = 'https://localhost:7096/api/' ;
var shiftArray =[];
export const shift = ["06:00:00-07:00:00","07:00:00-08:00:00","17:00:00-18:00:00","18:00:00-19:00:00"];

export default function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}
export const notification = 'dab31fb0-0078-490b-a76f-e4142948ca8a'
export const URL_VNPay = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?'
export const commandPay = 'pay'
export const currCode = 'VND'
export const IpAddr = '127.0.0.1'
export const locale = 'vn'
export const orderType = 'orther'
export const reciveURL = 'http%3A%2F%2Flocalhost%3A3000%2Fthanks'
export const tmnCode = 'DHTJ6UWT'
export const txnRef = Math.floor(Math.random() * 100000);
export const secretKey = 'WLZGWGGXPTZFHBGNRKRFFPJMQXEMJDXC'
export const version = '2.1.0'

export  function HmacSHA256Hash(input,key){
    var out = CryptoJS.HmacSHA256(input,key)
    return out;
}

