import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";



import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import SchoolIcon from '@mui/icons-material/School';

import StatBox from "../../common/components/StatBox"

import '../css/Dashboard.css'
import BarChart from "../../common/components/BarChart";
import PieChart from "../../common/components/PieChart";
import LineChart from "../../common/components/LineChart";
import GenderChart from "../../common/components/GenderChart";
import { URL_API } from "../../staff/components/ConstDefine";
import axios from "axios";
import { DesktopDatePicker } from "@mui/x-date-pickers";

var month = (new Date).getMonth()+1;
export default function Dashboard(){
    const [invoice,setInvoice] = useState([]);
    const [student,setStudent] = useState([]);
    const [classes,setClasses] = useState([]);
    const [teacher,setTeacher] = useState([]);
    ///URL_API
    const invoiceAPI = URL_API +`Invoice`;
    const studentByInvoiceAPI = URL_API + `Invoice/GetAllStudent`
    const allClassAPI = URL_API + `Class`
    const allTeacherAPI = URL_API + `Teacher`
    useEffect(()=>{
        axios.get(invoiceAPI).then(r=>setInvoice(r.data)).catch(err=>console.log(err));
    },[]);
    useEffect(()=>{
        axios.get(studentByInvoiceAPI).then(r=>setStudent(r.data)).catch(err=>console.log(err));
    },[]);
    useEffect(()=>{
        axios.get(allClassAPI).then(r=>setClasses(r.data)).catch(err=>console.log(err));
    },[]);
    useEffect(()=>{
        axios.get(allTeacherAPI).then(r=>setTeacher(r.data)).catch(err=>console.log(err));
    },[]);
    ///Revenue box
    var revernue = 0;
    var thismonthRevernue = 0
    invoice.forEach(invoice=>{
        revernue += invoice.totalPay;
        if(filterDay(invoice.datePay) === month){
            thismonthRevernue+=invoice.totalPay;
        }
    })
    var increasePercent = (thismonthRevernue/(revernue-thismonthRevernue))*100;
    var getDecimalVal = increasePercent.toString().indexOf(".");
    if(getDecimalVal !== -1){
    var increase = increasePercent.toString().substring(0,getDecimalVal+2);
    }else{
        increase = increasePercent
    }
    ///TotalStudent Box
    var totalStudent = 0;
    student.forEach(student=>{
        totalStudent += 1;
    })
    ///TotalClass Box
    var totalClass = 0;
    var classOfMonth = 0;
    classes.forEach(classs=>{
        totalClass += 1;
        if(filterDay(classs.classStartDate) === month){
            classOfMonth+=1;
        }
    })
    var increasePercentOfClass = (classOfMonth/(totalClass-classOfMonth))*100;
    var getDecimalValOfClass = increasePercentOfClass.toString().indexOf(".");
    if(getDecimalValOfClass !== -1){
    var increaseClass = increasePercentOfClass.toString().substring(0,getDecimalVal+2);
    }else{
        increaseClass = increasePercentOfClass
    }
    ///TotalTeacher
    var totalTeacher = 0;
    var newteacherOfMonth = 0;
    teacher.forEach(teacher=>{
        let dateStart = new Date(teacher.teacherStartDate);
        let dateEnd = new Date(teacher.teacherEndDate);
        if(dateStart< (new Date) && (new Date) <dateEnd){
            totalTeacher +=1;
        }
        if(filterDay(teacher.teacherStartDate) === month){
            newteacherOfMonth+=1;
        }
    })
    var increasePercentOfTeacher= (newteacherOfMonth/(totalTeacher-newteacherOfMonth))*100;
    var getDecimalValOfTeacher = increasePercentOfTeacher.toString().indexOf(".");
    if(getDecimalValOfTeacher !== -1){
    var increaseTeacher = increasePercentOfTeacher.toString().substring(0,getDecimalVal+2);
    }else{
        increaseTeacher = increasePercentOfTeacher
    }
    ///Filter
    function filterDay(day){
        const split = day.split("T");
        let value = split[0];
        const split1 = value.split("-")
        let month = (new Date(value)).getMonth()+1;
        return month;
    }

    
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
                        title={revernue+" VND"}
                        subtitle="Revenue"

                        progress={thismonthRevernue/(revernue-thismonthRevernue)}
                        increase={"+"+increase+"%"}


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
                        title={totalStudent}
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
                        title={totalClass}
                        subtitle="Total Class"
                        progress={classOfMonth/(totalClass-classOfMonth)}
                        increase={"+"+increaseClass+"%"}
                        icon={
                        <SchoolIcon
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
                        title={totalTeacher}
                        subtitle="Total Instuctor"
                        progress={newteacherOfMonth/(totalTeacher-newteacherOfMonth)}
                        increase={"+"+increasePercentOfTeacher+"%"}
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