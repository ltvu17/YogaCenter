import React, { useCallback, useContext, useEffect, useState } from "react";
import { URL_API } from "./ConstDefine";
import axios from "axios";
import { dataContext } from "./Staffmanage";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid} from '@mui/material';
import { useNavigate } from "react-router-dom";

var curr = new Date();
curr.setDate(curr.getDate() + 1);
var date = curr.toISOString().substring(0, 10);

export default function UpdateClass({ id }) {
  ///Declare
  const data = useContext(dataContext);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [inputField, setInputFields] = useState({
    teacherId: "-1",
    courseId: "0",
    className: "",
    classEndDate: "",
    classStartDate: "",
    teacherName: "",
    courseName: "",
  });
  ////URL_API
  let getclass = URL_API + `Class/${id}`;

  ///Get data

  useEffect(() => {
    if (id !== "") {
      axios
        .get(getclass)
        .then((r) =>
          setInputFields((p) => {
            return {
              classEndDate: r.data.classEndDate,
              classStartDate: r.data.classStartDate,
              className: r.data.className,
              courseId: r.data.course.id,
              teacherId: r.data.teacher ? r.data.teacher.id : "-1",
              teacherName: r.data.teacher ? r.data.teacher.teacherName : "None",
              courseName: r.data.course.courseDescription,
            };
          })
        )
        .catch((err) => console.log(err));
    }
  }, [id]);
  ////Submit data
  function submitAdd(e) {
    e.preventDefault();
    setOpen(false);
    if(inputField.className === ''){
      alert("You need to fill class name")
      return;
    }
    axios.put(getclass,{
      className : inputField.className,
      classStartDate : inputField.classStartDate,
      classEndDate : inputField.classEndDate,
  },{
      headers:{
          teacherId : inputField.teacherId === '-1'?null:inputField.teacherId,
          courseId : inputField.courseId
      }
  }).then(r=>console.log(r)).catch(err=>console.log(err));
    navigate(0);
    
  }
  //Filter
  function filterDay(day) {
    const split = day.split("T");
    let value = split[0];
    return value;
  }
  ///Handler
  const ChangeHandler = (e) => {
    setInputFields((p) => {
      return { ...inputField, [e.target.name]: e.target.value };
    });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const Updatecomp = useCallback(()=>{
  return (
    <Grid container item md={12}>
      <form style={{width:'100%'}}>
        <table className="table-add-class" style={{ marginTop: "0" }}>
          <thead>
            <tr>
              <th>Class Name</th>
              <th>StartDate</th>
              <th>EndDate</th>
              <th>Teacher</th>
              <th>Course</th>
              <th>Action</th>
            </tr>
          </thead>
            <tbody>
              <tr className='staff-add-newClass'>
              <td><TextField
            variant="outlined"
            name="className"
            value={inputField.className}
            required
            onChange={ChangeHandler}
            sx={{ backgroundColor: "white", borderRadius: "5px" }}
          ></TextField></td>
          <td><input
            type="date"
            name="classStartDate"
            defaultValue={filterDay(inputField.classStartDate)}
            onChange={ChangeHandler}
            required
          /></td>
          <td><input
            type="date"
            name="classEndDate"
            defaultValue={filterDay(inputField.classEndDate)}
            onChange={ChangeHandler}
            min={filterDay(inputField.classStartDate)}
            required
          /></td>
          <td><select
            defaultValue={inputField.teacherId}
            name="teacherId"
            required
            onChange={ChangeHandler}
          >
            <option value={inputField.teacherId} disabled hidden>
              {inputField.teacherName}
            </option>
            <option value="-1">None</option>
            {data.teachers.map((item, index) => (
              <option key={index} value={item.id}>
                {item.teacherName}
              </option>
            ))}
          </select></td>
          <td><select
            defaultValue={inputField.courseId}
            name="courseId"
            required
            onChange={ChangeHandler}
          >
            <option value={inputField.courseId} disabled hidden>
              {inputField.courseName}
            </option>
            {data.courses.map((item, index) => (
              <option key={index} value={item.id}>
                {item.courseDescription}
              </option>
            ))}
          </select></td>
          {/* {message?(<p style={{color: 'red', backgroundColor:'white'}}>{message}</p>):''} */}
              <td>
          <Button
            variant="contained"
            onClick={submitAdd}
            sx={{
              padding: 1,
              margin: 1,
              color: "white",
              backgroundColor: "#0643b9",
            }}
          >
            Save
            </Button>
            </td>
              </tr>
            </tbody>
       
        
        </table>
      </form>
    </Grid>
  );

}
