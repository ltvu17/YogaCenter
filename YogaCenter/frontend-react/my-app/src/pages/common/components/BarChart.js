import { ResponsiveBar } from '@nivo/bar';
import { useState } from 'react';
import { URL_API } from '../../staff/components/ConstDefine';
// import { dataBarChart } from '../../../data/ListOfDashboard';
import { useEffect } from 'react';
import axios from 'axios';


const BarChart = () =>{
  const [invoice,setInvoice] = useState([]);
  const [revenue,setRevenue] = useState([]);
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
  var revernueQ1 = 0;
  var revernueQ2 = 0;
  var revernueQ3 = 0;
  var revernueQ4 = 0;
  invoice.forEach(invoice=>{
    if(filterDay(invoice.datePay) === 1 || filterDay(invoice.datePay) === 2||filterDay(invoice.datePay) === 3){
      revernueQ1 += invoice.totalPay
    }
    else 
    if(filterDay(invoice.datePay) === 4 || filterDay(invoice.datePay) === 5||filterDay(invoice.datePay) === 6){
      revernueQ2 += invoice.totalPay
    } 
    else 
    if(filterDay(invoice.datePay) === 7 || filterDay(invoice.datePay) === 8||filterDay(invoice.datePay) === 9){
      revernueQ3 += invoice.totalPay
    } 
    else 
    if(filterDay(invoice.datePay) === 10 || filterDay(invoice.datePay) === 11||filterDay(invoice.datePay) === 12){
      revernueQ4 += invoice.totalPay
    }
  })
  const dataBarChart =[
    {
        quarterly : "1",
        revenue: revernueQ1,
       
      },
      {
        quarterly : "2",
        revenue: revernueQ2,
      },
      {
        quarterly : "3",
        revenue: revernueQ3,
      },
      {
        quarterly : "4",
        revenue: revernueQ4,
      }
    
  ];

    return (
        <div style={{  position:"relative", height: "100%", width: "100%" }}>
          <h2 style={{ textAlign: 'center', padding: '8px'}}>Quarterly revenue</h2>
          <div style={{ position: "absolute", top: 0, height: "100%", width: "100%" }}>
            <ResponsiveBar
             
              data={dataBarChart}
              keys={["revenue"]}
              indexBy="quarterly"
              margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
              padding={0.5}
              valueScale={{ type: "linear" }}
              indexScale={{ type: "band", round: true }}
              colors="#526D82"
              borderWidth={1}
           
              borderColor="#526d8299"
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Quarterly ",
                legendPosition: "middle",
                legendOffset: 36,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Million Dong",
                legendPosition: "middle",
                legendOffset: -40,
                
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{
                  from: 'color',
                  modifiers: [
                      [
                          'brighter',
                          '2.4'
                      ]
                  ]
              }}
              legends={[
                {
                  dataFrom: "keys",
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 120,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemWidth: 90,
                  itemHeight: 20,
                  itemDirection: "left-to-right",
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemOpacity: 1,
                      },
                    },
                  ],
                
                },
              ]}
            />
          </div>
      </div>
      );
    };
export default BarChart