import React, { useCallback } from "react";
import { useState } from "react";
import { URL_API } from "../../../api/ConstDefine";
import { useEffect } from "react";
import axios from "axios";
import "../css/StudentManage.css";
import { Radio, FormControlLabel, RadioGroup, Button } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function CheckAttendent(props) {
  //----------------------------API---------------------------------
  let studentClassAPI =
    URL_API + `CustomerLesson/getCusLessonByLessonId${props.lesson.id}`;
    let updateCustomerLesson = URL_API ;

  //-----------------------------Khởi Tạo-----------------------
  const [listStudent, setListStudent] = useState(null);
  const [attendance, setAttendance] = useState(false);
  //-----------------------------useEfect--------------------------
  useEffect(() => {
    axios
      .get(studentClassAPI)
      .then((res) => {
        setListStudent(res.data);
        setAttendance(true)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [attendance]);

  //-----------------------------handlerClick----------------------
  const back = () => {
    props.onBackClick();
  };
  const handleClickAttendent = (customerId, lessonId, value) => {
    // setAttendance(value)
    updateCustomerLesson +=  `CustomerLesson/${lessonId}/${customerId}`
    axios
      .put(updateCustomerLesson, {
        customerId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        lessonId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        attendance: value === "attendent" ? 1 : 0,
      })
      .then(
        setAttendance(false),
        console.log("Da update duoc attendent"),
        console.log(lessonId),
        console.log(customerId)
      )
      .catch((error) => {
        console.log(error);
      });
    
  };

  
  
  console.log(listStudent);
  return (
    <div className="student-manage">
      <div className="class-post">
        <Button
          className="button-back"
          variant="contained"
          startIcon={<ArrowBackIcon fontSize="large" />}
          onClick={back}
          sx={{
            padding: 1,
            margin: 1,
            color: "white",
            fontSize: "18px",
            fontWeight: "600",
            backgroundColor: "rgb(38 38 38 / 85%)",
          }}
        >
          Back to schedule
        </Button>
        <table className="table-add-class">
          <thead>
            <tr>
              <th>Index</th>
              <th>Student Name</th>
              <th>Student Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listStudent ? (
              listStudent.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.customer.customerName}</td>
                  <td>N/a</td>
                  <td>
                    <RadioGroup
                      name="attendance"
                      value={item.attendance === 1 ? "attendent" : "absent"}
                      onChange ={(event) =>handleClickAttendent(item.customerId, item.lessonId,event.target.value)}
                      row
                    >
                      <FormControlLabel
                        value="attendent"
                        control={<Radio />}
                        label="Attendent"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="absent"
                        control={<Radio />}
                        label="Absent"
                        labelPlacement="end"
                      />
                    </RadioGroup>
                  </td>
                </tr>
              ))
            ) : (
              <tr></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
