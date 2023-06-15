import React,{useContext, useEffect, useRef, useState} from 'react'
import '../css/StaffManager.css'
import axios from 'axios'
import {URL_API}from '../components/ConstDefine'
import Button from '@mui/material/Button';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import UpgradeRoundedIcon from '@mui/icons-material/UpgradeRounded';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import TextField from "@mui/material/TextField";
import { Link } from 'react-router-dom';
import UpdateClass from './UpdateClass';
// import UpdateClass from './UpdateClass';

var curr = new Date();
curr.setDate(curr.getDate()+1);
var date = curr.toISOString().substring(0,10);
export const dataContext = React.createContext({teachers : {}, courses : {}});


export default function Staffmanage() {
    //Const field
    const [postsClass,setPostClass]=useState([]);
    const [postsCoures,setPostCourses]=useState([]);
    const [postsTeacher,setPostTeacher]=useState([]);
    const [idUpdate,setUpdate] = useState('');
    const [inputField,setInputFields] = useState({
        teacherId : '-1',
        courseId : '0',
        className : '',
        classEndDate : date,
        classStartDate: date
    });
    const [count,setCount] =useState(0);
    const [message,setMessage] =useState();
    ///URL_API
    let getallclass = URL_API+'Class';
    let getallcourse = URL_API+'Course';
    let getallteaccher = URL_API+'Teacher';
    let postNewClass = URL_API+'Class';
    ///////GET API
    //GetAllclass
    useEffect(() =>{       
        axios.get(getallclass).then(r=>{
            setPostClass(r.data)}).catch(er=>console.log(er))
    },[]);
    //GetAllCourse
    useEffect(() =>{       
        axios.get(getallcourse).then(r=>{
            setPostCourses(r.data)}).catch(er=>console.log(er))
    },[]);
    //GetAllTeacher
    useEffect(() =>{       
        axios.get(getallteaccher).then(r=>{
            setPostTeacher(r.data)}).catch(er=>console.log(er))
    },[]);


    //handler
    const AddHandler = ()=>{
        if(count < 1)
        setCount(count => count+1);
     }
    const MinusHandler = () =>{
        if(count >0)
        setCount(count => count -1);
    }
    const ChangeHandler = (e) =>{
        setInputFields(p => {
          return {...inputField, [e.target.name] : e.target.value }
        })    
      };

    //filter function
    function filterDay(day){
         const split = day.split("T");
         let value = split[0];
         return value;
    }
    const submitAdd=()=>{
        if(inputField.courseId === '0'){
            setMessage(message => 'Chose course!');
            return; 
        }
        if(inputField.className === ''){
            return;
        }
        axios.post(postNewClass,{
            className : inputField.className,
            classStartDate : inputField.classStartDate,
            classEndDate : inputField.classEndDate,
        },{
            headers:{
                teacherId : inputField.teacherId === '-1'?null:inputField.teacherId,
                courseId : inputField.courseId
            }
        }
        ).then(r => console.log(r)).catch(er=>console.log(er));
    }


    // filter value

     function getvalue(value){
        setUpdate(p=>value);
        
        const element = document.getElementById('update');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        
     }   

  return (
    <div>
    <div className='staffDiv'>
    </div>
      <div className='class-post' >
        <p>Add class</p>  
        <form>
        <table className='table-add-class'>
                <thead>
                <tr>
                    <th>Index</th>
                    <th>Class Name</th>
                    <th>Class StartDate</th>
                    <th>Class EndDate</th>
                    <th>Teacher</th>
                    <th>Course</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    {postsClass.map(((item, index) =>(
                        <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.className}</td>
                        <td>{filterDay(item.classStartDate)}</td>
                        <td>{filterDay(item.classEndDate)}</td>
                        <td>{item.teacher ? item.teacher.teacherName : null}</td>
                        <td>{item.course.courseDescription}</td>
                        <td style={{textAlign: 'center'}}>
                            <div> 
                                <Button variant='text' color='success' startIcon={<UpgradeRoundedIcon/>} onClick={()=>getvalue(item.id)}
                            sx={{padding :1,margin:1, color: 'white', backgroundColor:'rgb(127, 69, 101)'}}>Update Class</Button>
                                <Button variant='text' color='success' startIcon={<DeleteForeverOutlinedIcon/>}
                                sx={{padding :1,margin:1, color: 'white', backgroundColor:'rgb(127, 69, 101)'}}>Delete Class</Button>
                            
                            </div>
                        </td>        
                       </tr>
                    )))}
{/* Get Input form */}
                    {Array.from(Array(count)).map(((index,c) => (
                        
                    <tr key ={c}>
                    <td><IconButton onClick={MinusHandler}><DeleteForeverIcon/></IconButton></td>
                    <td><TextField variant='outlined' size='small' name='className' label='Class name' required onChange={ChangeHandler}
                    sx={{color : 'rgb(127, 69, 101)',backgroundColor:'#F9A7B0',borderRadius:'5px'}}></TextField></td>
                    <td><input type='date' name='classStartDate' defaultValue={date} min={date} required onChange={ChangeHandler}/></td>
                    <td><input type='date' name='classEndDate' defaultValue={date} min={inputField.classStartDate} required onChange={ChangeHandler}/></td>
                    <td><select defaultValue="0" name='teacherId' required onChange={ChangeHandler}>
                            <option value="0" disabled hidden>Choose Teacher</option>
                            <option value ='-1'>None</option>
                        {postsTeacher.map(((item,index) =>(          
                                              
                                <option key={index} value={item.id} >{item.teacherName}</option>                      
                        )))}
                        </select></td>
                    <td>
                        <select defaultValue="0" name='courseId' required onChange={ChangeHandler}>
                                <option value="0" disabled hidden>Choose Course</option>
                        {postsCoures.map(((item,index) =>(          
                                              
                                <option key={index}  value={item.id} >{item.courseDescription}</option>                      
                        )))}
                          
                        </select>
                        {message?(<p style={{color: 'red', backgroundColor:'white'}}>{message}</p>):''}
                        
                    </td>
                    <td><Button variant='text' color='success' type='submit' onClick={submitAdd}
                    sx={{padding :1,margin:1, color: 'white', backgroundColor:'rgb(127, 69, 101)'}}>Add</Button></td>
                    </tr>
                    )))}  
   {/*  */}
                    <tr>
                        <td colSpan={7}><Button variant='text' color='success' onClick={AddHandler}
                        startIcon={<AddCircleOutlineRoundedIcon sx={{ fontSize: 30 }}>add_circle</AddCircleOutlineRoundedIcon>}
                        sx={{padding :1,margin:1, color: 'white', backgroundColor:'rgb(127, 69, 101)'}}>Add New Class</Button></td>
                    </tr>
                </tbody>
            </table>  
            </form>
    </div>
            <div>
            <dataContext.Provider value={{teachers:postsTeacher,courses:postsCoures}}>
               <UpdateClass id={idUpdate}/>
            </dataContext.Provider> 
            </div>        
    </div>
  )
}
