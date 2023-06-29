import { ResponsiveBar } from '@nivo/bar';

import {dataBarChart} from '../../../data/ListOfDashboard'

const BarChart = () =>{
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