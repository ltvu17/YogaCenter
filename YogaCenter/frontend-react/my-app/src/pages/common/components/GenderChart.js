import React from "react";
import { ResponsiveBar } from "@nivo/bar";

import {gender} from '../../../data/DataGender'
const GenderChart = () => {
    const genderColors = {
        Male: "#FF0000",
        Female: "#0000FF",
      };
    return(
        <div style={{  position:"relative", height: "100%", width: "100%" }}>
        <h2 style={{ textAlign: 'center', padding: '8px'}}>
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
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
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
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: 32
        }}
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