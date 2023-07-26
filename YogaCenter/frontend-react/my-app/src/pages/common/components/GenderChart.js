import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { useState } from "react";
import { URL_API } from "../../staff/components/ConstDefine";
import { useEffect } from "react";
import axios from "axios";
import { useTheme } from "@mui/material";

// import {gender} from '../../../data/DataGender'
const GenderChart = () => {
    const genderColors = {
        Male: "#a5f7ffc7",
        Female: "#c9be63",
        Sum:"rgb(155, 169, 229)"
    };
    const [customers, setCustomers] = useState([]);
    let customerAPI = URL_API + `Customer`;
    useEffect(()=>{
        axios.get(customerAPI).then(r => setCustomers(r.data)).catch(err => console.log(err));
    },[]);
    var male = 0;
    var female = 0;
    customers.forEach(cus =>{
        if(cus.customerGender === 'Male'){
            male +=1;
        }
        if(cus.customerGender === 'Female'){
            female +=1;
        }
    })

    const gender = [
        {
            gender:"Male",
            number:male
        },
        {
            gender:"Female",
            number:female
        },
        {
            gender:"Sum",
            number:customers.length
        }
    ];

const theme=useTheme()
    return(
        <div style={{  position:"relative", height: "100%", width: "100%" }}>
        <h2 style={{ textAlign: 'center', padding: '8px',color:'white'}}>
            Gender ratio</h2>
        <div className="gender-chart" style={{ position: "absolute", top: 0, height: "100%", width: "100%" }}>

       <ResponsiveBar
        data={gender}
        keys={["number"]}
        indexBy="gender"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.25}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        valueFormat=" <-0,~"
        colors={({ id, data }) => genderColors[data.gender]}
        theme={{

                  axis:{
                  legend:{
                    text: {
                      fill: "white",
                    }
                  },  
                  ticks: {
                    line: {
                      stroke: "white",
                      strokeWidth: 1
                    },
                    text: {
                       fontSize: 11,
                       fill: "white",
                       outlineWidth: 0,
                       outlineColor: "transparent"
                    }
                  }
                }
        }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
  
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    '1.8'
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
   
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Number',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        enableGridY={false}
        labelSkipWidth={8}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'brighter',
                    '3'
                ]
            ]
        }}
       
      
    />
         </div>
      </div>
 
    )
}
export default GenderChart