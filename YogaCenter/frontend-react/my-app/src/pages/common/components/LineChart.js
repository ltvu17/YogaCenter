import React from "react";
import { ResponsiveLine } from '@nivo/line'
import { DataLineChart } from "../../../data/DataLineChar";
import { useEffect } from 'react';
import axios from 'axios';
import { URL_API } from "../../staff/components/ConstDefine";
import { useState } from 'react';

const LineChart = () => {
    const [invoice,setInvoice] = useState([]);
    const invoiceAPI = URL_API +`Invoice`;
    useEffect(()=>{
        axios.get(invoiceAPI).then(r=>setInvoice(r.data)).catch(err=>console.log(err));
    },[]);
    function filterDay(day){
        const split = day.split("T");
        let value = split[0];
        const split1 = value.split("-")
        let month = (new Date(value)).getMonth()+1;
        return month;
    }
    var T1 = 0;
    var T2 = 0;
    var T3 = 0;
    var T4 = 0;
    var T5 = 0;
    var T6 = 0;
    var T7 = 0;
    var T8 = 0;
    var T9 = 0;
    var T10 = 0;
    var T11 = 0;
    var T12 = 0;
    invoice.forEach(invoice=>{
    if(filterDay(invoice.datePay) === 1){
        T1 += invoice.totalPay
    }
    else 
    if(filterDay(invoice.datePay) === 2){
        T2 += invoice.totalPay
    } 
    else 
    if(filterDay(invoice.datePay) === 3){
        T3 += invoice.totalPay
    }
    else 
    if(filterDay(invoice.datePay) === 4){
        T4 += invoice.totalPay
    } 
    else 
    if(filterDay(invoice.datePay) === 5){
        T5 += invoice.totalPay
    } 
    else 
    if(filterDay(invoice.datePay) === 6){
        T6 += invoice.totalPay
    } 
    else 
    if(filterDay(invoice.datePay) === 7){
        T7 += invoice.totalPay
    } 
    else 
    if(filterDay(invoice.datePay) === 8){
        T8 += invoice.totalPay
    } 
    else 
    if(filterDay(invoice.datePay) === 9){
        T9 += invoice.totalPay
    } 
    else 
    if(filterDay(invoice.datePay) === 10){
        T10 += invoice.totalPay
    }  
    else 
    if(filterDay(invoice.datePay) === 11){
        T11 += invoice.totalPay
    }
    else 
    if(filterDay(invoice.datePay) === 12){
        T12 += invoice.totalPay
    }
  })
  console.log(T6);
    const DataLineChart = [
    {
      "id": "revenue",
      "color": "hsl(296, 70%, 50%)",
      "data": [
        {
          "x": "Jan",
          "y": T1
        },
        {
          "x": "Fer",
          "y": T2
        },
        {
          "x": "Mar",
          "y": T3
        },
        {
          "x": "Apr",
          "y": T4
        },
        {
          "x": "May",
          "y": T5
        },
        {
          "x": "Jun",
          "y": T6
        },
        {
          "x": "Jul",
          "y": T7
        },
        {
          "x": "Aug",
          "y": T8
        },
        {
          "x": "Sep",
          "y": T9
        },
        {
          "x": "Oct",
          "y": T10
        },
        {
          "x": "Nov",
          "y": T11
        },
        {
          "x": "Dec",
          "y": T12
        }
      ]
    },
    ] 
    return(
        <div style={{  position:"relative", height: "100%", width: "100%" }}>
        <h2 style={{ textAlign: 'center', padding: '8px'}}>Monthly revenue</h2>
        <div style={{ position: "absolute", top: 0, height: "100%", width: "100%" }}>
        <ResponsiveLine
        data={DataLineChart}
        margin={{ top: 50, right: 110, bottom: 50, left: 90 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Month',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Million Dong',
            legendOffset: -60,
            legendPosition: 'middle'
        }}
        enableGridX={false}
        enableGridY={false}
        pointSize={2}
        colors="#2D4356"
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        enablePointLabel={true}
        pointLabelYOffset={-12}
        areaOpacity={0.65}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
        </div>
      </div>
    )
}
export default LineChart