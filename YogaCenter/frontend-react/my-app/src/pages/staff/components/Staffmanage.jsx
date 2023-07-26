import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import '../css/StaffManager.css'
import axios from 'axios'
import { URL_API } from '../components/ConstDefine'
import Button from '@mui/material/Button';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import UpgradeRoundedIcon from '@mui/icons-material/UpgradeRounded';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import UpdateClass from './UpdateClass';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import styled from '@emotion/styled';
import { Grid} from '@mui/material';
import Pagination from '@mui/material/Pagination';
var curr = new Date();
curr.setDate(curr.getDate() + 1);
var date = curr.toISOString().substring(0, 10);
export const dataContext = React.createContext({ teachers: {}, courses: {} });


export default function Staffmanage() {
    //Const field
    const [postsClass, setPostClass] = useState([]);
    const [postsCoures, setPostCourses] = useState([]);
    const [postsTeacher, setPostTeacher] = useState([]);
    const [search, setSearch] = useState({
        search: '',
        searchBy: ''
    });
    const [idUpdate, setUpdate] = useState('');
    const [idDelete, setIdDelete] = useState('');
    const [idStudentManage, setIdStudentManage] = useState({
        id: '',
        name: ''
    });
    const [open, setOpen] = useState(false);
    const [inputField, setInputFields] = useState({
        teacherId: '-1',
        courseId: '0',
        className: '',
        classEndDate: date,
        classStartDate: date
    });
    const [count, setCount] = useState(0);
    const [message, setMessage] = useState();
    const navigate = useNavigate();

    ///URL_API
    let getallclass = URL_API + 'Class';
    let getallcourse = URL_API + 'Course';
    let getallteaccher = URL_API + 'Teacher';
    let postNewClass = URL_API + 'Class';
    let deleteClassURL = URL_API + `Class/${idDelete}`

    ///////GET API
    //GetAllclass
    useEffect(() => {
        axios.get(getallclass).then(r => {
            setPostClass(r.data)
        }).catch(er => console.log(er))
    }, []);
    //GetAllCourse
    useEffect(() => {
        axios.get(getallcourse).then(r => {
            setPostCourses(r.data)
        }).catch(er => console.log(er))
    }, []);
    //GetAllTeacher
    useEffect(() => {
        axios.get(getallteaccher).then(r => {
            setPostTeacher(r.data)
        }).catch(er => console.log(er))
    }, []);
    ///DeleteClass
    const deleteSubmit = () => {
        setOpen(false);
        navigate(0);
        axios.delete(deleteClassURL).then(r => {
            console(r)
        }).catch(er => console.log(er))
    }


    //handler
    const AddHandler = () => {
        if (count < 1)
            setCount(count => count + 1);
    }
    const MinusHandler = () => {
        if (count > 0)
            setCount(count => count - 1);
    }
    const ChangeHandler = (e) => {
        setInputFields(p => {
            return { ...inputField, [e.target.name]: e.target.value }
        })
    };
    const offUpdateHandler = () => {
        setUpdate(p => '');
    }

    const handleClose = () => {
        setOpen(false);
    };
    const searchHanlde = (e) => {
        setSearch(p => {
            return {
                ...search,
                [e.target.name]: e.target.value.toUpperCase().trim()
            }
        })
    };

    const searchSubmit = () => {
        var temp = [];
        if (search.search !== '' && search.searchBy === 'BYNAME') {
            postsClass.forEach(classs => {
                if (classs.className.toUpperCase().includes(search.search)) {
                    temp.push(classs)
                }
                setPostClass(temp);
            });
        }

        if (search.search !== '' && search.searchBy === 'BYTEACHER') {
            postsClass.forEach(classs => {
                if (classs.teacher !== null) {
                    if (classs.teacher.teacherName.toUpperCase().includes(search.search)) {
                        temp.push(classs)
                    }
                    setPostClass(temp);
                }
                if (search.search === "NONE") {
                    if (classs.teacher === null) {
                        temp.push(classs)
                    }
                    setPostClass(temp);
                }
            });
        }
        if (search.search !== '' && search.searchBy === 'BYCOURSE') {
            postsClass.forEach(classs => {
                if (classs.course.courseDescription.toUpperCase().includes(search.search)) {
                    temp.push(classs)
                }
                setPostClass(temp);
            });
        }



        if (search.search == '') {
            axios.get(getallclass).then(r => {
                setPostClass(r.data)
            }).catch(er => console.log(er))
        };
    }

    //filter function
    function filterDay(day) {
        const split = day.split("T");
        let value = split[0];
        return value;
    }
    const submitAdd = (e) => {
        
        if (inputField.courseId === '0') {
            setMessage(message => 'Chose course!');
            e.preventDefault();
            return;
        }
        if (inputField.className === '') {
            return;
        }
        axios.post(postNewClass, {
            className: inputField.className,
            classStartDate: inputField.classStartDate,
            classEndDate: inputField.classEndDate,
        }, {
            headers: {
                teacherId: inputField.teacherId === '-1' ? null : inputField.teacherId,
                courseId: inputField.courseId
            }
        }
        ).then(r => console.log(r)).catch(er => console.log(er));
    }

    
    function deleteClass(value){
        setOpen(true);     
        setIdDelete(value);  


    }

    // filter value
    function getvalueUpdate(value) {
        if (idUpdate === '')
            setUpdate(p => value);
        const element = document.getElementById('update');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });

          }    
    } 
    function getValueStudentManage(Name,Id,courseId){
        if(idStudentManage.id === '')
        setIdStudentManage(p => {
            return{
                id : Id,
                name:Name
            }
        });
        navigate('/studentmanage',{state: { id : Id,name : Name,courseId : courseId}}); 
    } 


    const CustomButton = styled(Button)`
      background-color: #0643b9;
      font-family: arial;
      color: white;
      border-radius: 8px;
      height: 50px;
      font-weight: 600;

   
      &:hover {
        background-color: #0c46b5;
      }
    `;
    const DeleteButton = styled(Button)`
    background-color: #dd0202;
    font-family: arial;
    color: white;
    border-radius: 8px;
    height: 50px;
    font-weight: 600;

  
     &:hover {
        background-color:  #f10303;
     }
   `;

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
     const totalItems = postsClass.length;
     const totalPages = Math.ceil(totalItems / itemsPerPage);
     const startIndex = (currentPage - 1) * itemsPerPage;
     const endIndex = startIndex + itemsPerPage;
     const displayedPosts = postsClass.slice(startIndex, endIndex);
   
     // Handler functions
     const handlePageChange = (event, page) => {
       setCurrentPage(page);
     };
    return (
        <div className='Manage-class'>
            <div className='class-post' >
                <h1 className='staff-title'>Class Management </h1>
                <div className='staff-search-class'>
                        <TextField className='input-search' name='search' id="outlined-basic" label="Search" variant="outlined" onChange={searchHanlde}></TextField>
                        <FormControl sx={{ width: '120px' }} className='form-choice-search' >
                            <InputLabel id="demo-simple-select-label">Search By</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Search By"
                                name='searchBy'
                                value={search.searchBy}
                                onChange={searchHanlde}
                                required
                            >
                                <MenuItem value={`BYNAME`}>Name</MenuItem>
                                <MenuItem value='BYTEACHER'>Teacher</MenuItem>
                                <MenuItem value='BYCOURSE'>Course</MenuItem>
                            </Select>
                        </FormControl>
                        <CustomButton sx={{ borderRadius: '20px', height: '50px' }} className='staff-button-search' variant="contained" onClick={searchSubmit}>Search</CustomButton>
                    </div>
                <form>
    
                    <table className='table-add-class'>
                        <thead>
                            <tr>
                                <th>Index</th>
                                <th>Class Name</th>
                                <th>StartDate</th>
                                <th>EndDate</th>
                                <th>Teacher</th>
                                <th>Course</th>
                                <th>Capacity</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedPosts.map(((item, index) => (
                                <tr key={index}>
                                    <td>{startIndex+index + 1}</td>
                                    <td>{item.className}</td>
                                    <td>{filterDay(item.classStartDate)}</td>
                                    <td>{filterDay(item.classEndDate)}</td>
                                    <td>{item.teacher ? item.teacher.teacherName : null}</td>
                                    <td>{item.course.courseDescription}</td>
                                    <td>{item.capacity}/20</td>
                                    <td style={{ textAlign: 'center',width:'30%',padding:'10px' }}>
                              
                                    <Box sx={{ width: 1 }}>
                                        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                                            <Box gridColumn="span 6">
                                                <CustomButton variant="contained" startIcon={<UpgradeRoundedIcon />} onClick={() => getvalueUpdate(item.id)}
                                                    sx={{color: 'white',padding:'6px 23px'}}>
                                                    Update Class
                                                </CustomButton>
                                            </Box>
                                            <Box gridColumn="span 6">
                                                <DeleteButton variant="contained" startIcon={<DeleteForeverOutlinedIcon />} onClick={() => deleteClass(item.id)}
                                                    sx={{color: 'white',padding:'6px 23px'}}>
                                                    Delete Class
                                                </DeleteButton>
                                            </Box>
                                            <Box gridColumn="span 12">
                                                <CustomButton variant="contained" startIcon={<AccessibilityNewIcon />} onClick={() => getValueStudentManage(item.className, item.id,item.course.id)}
                                                    sx={{color: 'white',width: '100%'}}>
                                                    Student Manage
                                                </CustomButton>
                                            </Box>

                                        </Box>
                                    </Box>
                                    </td>
                                </tr>
                            )))}
                            {/* Get Input form */}
                            {Array.from(Array(count)).map(((index, c) => (
                                <tr className='staff-add-newClass' key={c}>
                                    <td><IconButton className='icon-delete' onClick={MinusHandler}><DeleteForeverIcon /></IconButton></td>
                                    <td><TextField  className='text-addClass' placeholder='Class Name' variant='outlined'  name='className'  required onChange={ChangeHandler}
                                        sx={{ width:'9em', backgroundColor: 'white', borderRadius: '5px' }}></TextField></td>
                                    <td><input style={{height:'2.5em'}} type='date' name='classStartDate' defaultValue={date} required onChange={ChangeHandler} /></td>
                                    <td><input style={{height:'2.5em'}}  type='date' name='classEndDate' defaultValue={date} min={inputField.classStartDate} required onChange={ChangeHandler} /></td>
                                    <td><select style={{height:'2.5em'}}  defaultValue="0" name='teacherId' required onChange={ChangeHandler}>
                                        <option value="0" disabled hidden>Choose Teacher</option>
                                        <option value='-1'>None</option>
                                        {postsTeacher.map(((item, index) => (

                                            <option key={index} value={item.id} >{item.teacherName}</option>
                                        )))}
                                    </select></td>
                                    <td>
                                        <select style={{height:'2.5em'}}  defaultValue="0" name='courseId' required onChange={ChangeHandler}>
                                            <option value="0" disabled hidden>Choose Course</option>
                                            {postsCoures.map(((item, index) => (

                                                <option key={index} value={item.id} >{item.courseDescription}</option>
                                            )))}

                                        </select>
                                        {message ? (<p style={{ color: 'red', backgroundColor: 'white' }}>{message}</p>) : ''}

                                    </td>
                                    <td colSpan={2}><Button variant="contained"  type='submit' onClick={submitAdd}
                                        sx={{ color: 'white', backgroundColor: '#0643b9' }}>Add</Button></td>
                                </tr>
                            )))}
                           
                            <tr>
                                <td colSpan={8}><CustomButton variant="contained" onClick={AddHandler}
                                    startIcon={<AddCircleOutlineRoundedIcon sx={{ fontSize: 30 }}>add_circle</AddCircleOutlineRoundedIcon>}
                                    sx={{ margin:'15px'}}>Add New Class</CustomButton></td>
                            </tr>
                        </tbody>
                    </table>
            

                </form>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
          />
        </div>
            </div>
            <div >
                {idUpdate !== '' ? (
                    <Grid container className='staff-updateClass'>
                    <h1 style={{width:'100%',textAlign:'center',marginTop:'25px'}} id="update">Update <IconButton color='error' onClick={offUpdateHandler}>
                    <DeleteForeverIcon /></IconButton></h1>
                        <dataContext.Provider value={{ teachers: postsTeacher, courses: postsCoures }}>
                            <UpdateClass id={idUpdate} />
                        </dataContext.Provider>
                    </Grid>
                ) : ''}
            </div>
            <div id="delete">
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"YogaCenter Management"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" >
                            <p style={{ color: 'red' }}>Do you want to delete this class ?</p>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>No</Button>
                        <Button onClick={deleteSubmit} autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

        </div>
    )
}
