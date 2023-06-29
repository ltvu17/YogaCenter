import React from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";



import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

import StatBox from "../../common/components/StatBox"

import '../css/Dashboard.css'
import BarChart from "../../common/components/BarChart";
import PieChart from "../../common/components/PieChart";
import LineChart from "../../common/components/LineChart";
import GenderChart from "../../common/components/GenderChart";
export default function Dashboard(){
    return(
        <div className="dashboard">
        {/* <BarChart/> */}

            <div className="box-dashboard">
                <h1 style={{color:'black',marginBottom:'15px'}}>Dashboard</h1>
                <Box display="grid" gridTemplateColumns="repeat(12,1fr)" gridAutoRows="140px" gap="20px">

                    <Box
                    gridColumn="span 3"
                    backgroundColor="#cecece6e"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    >
                    <StatBox
                        title="12,361"
                        subtitle="Revenue"
                        progress="0.75"
                        increase="+14%"
                        icon={
                        <AttachMoneyIcon
                            sx={{ fontSize: "26px",color:"black" }}
                        />
                        }
                    />
                    </Box>
                    <Box
                    gridColumn="span 3"
                    backgroundColor="#cecece6e"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    >
                    <StatBox
                        title="431,225"
                        subtitle="Total Students"
                        progress="0.50"
                        increase="+21%"
                        icon={
                        <PointOfSaleIcon
                        sx={{ fontSize: "26px",color:"black" }}
                        />
                        }
                    />
                    </Box>
                    <Box
                    gridColumn="span 3"
                    backgroundColor="#cecece6e"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    >
                    <StatBox
                        title="32,441"
                        subtitle="New Customer"
                        progress="0.30"
                        increase="+5%"
                        icon={
                        <PersonAddIcon
                        sx={{ fontSize: "26px",color:"black" }}
                        />
                        }
                    />
                    </Box>
                    <Box
                        gridColumn="span 3"
                        backgroundColor="#cecece6e"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        >
                    <StatBox
                        title="1,325,134"
                        subtitle="Website Traffic"
                        progress="0.80"
                        increase="+43%"
                        icon={
                        <PersonSearchIcon
                        sx={{ fontSize: "26px",color:"black" }}
                        />
                        }
                    />
                    </Box>

                    <Box gridColumn="span 8" gridRow="span 2" backgroundColor="#cecece6e">
                        <BarChart/>
                    </Box>
                    <Box gridColumn="span 4" gridRow="span 2" backgroundColor="#cecece6e" >
                        <PieChart/>
                    </Box>
                    <Box gridColumn="span 8"  gridRow="span 2"  backgroundColor="#cecece6e" >
                        <LineChart/>
                    </Box>
                    <Box gridColumn="span 4"  gridRow="span 2"  backgroundColor="#cecece6e" >
                       <GenderChart/>
                    </Box>
                </Box>
            </div>
        </div>
    )
}