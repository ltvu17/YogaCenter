// import React,{useEffect, useState} from 'react'
// import '../css/StaffManager.css'
// import axios from 'axios'
// import {URL_API}from '../components/ConstDefine'
// export default function StaffManager() {
//   const [post,setPost]=useState();
//   let url = URL_API+'Class';
//   useEffect(() =>{       
//       axios.get(url).then(r=>setPost(r.data)).catch(er=>console.log(er))
//   },[])
//   console.log(post);
// return (
//   <div>
//   <div className='staffDiv'>
//   </div>
//     <div className='class-post' >
//       <p>Add class</p>  
//       <form >
//       <table className='table-add-class'>
//               <thead>
//               <tr>
//                   <th>Class Name</th>
//                   <th>Class StartDate</th>
//                   <th>Class EndDate</th>
//                   <th>Teacher</th>
//                   <th>Course</th>
//               </tr>
//               </thead>
//               <tbody>
//                   {post.map((item)=>         
//                   <tr key={item.id}>
//                       <td>{item.className}</td>
//                       <td>{item.classStartDate}</td>
//                       <td>{item.classEndDate}</td>
//                       <td>{item.teacher.teacherName}</td>
//                       <td>{item.course.courseDescription}</td>
//                   </tr>
//                   )                   
//                  }
//               </tbody>
//           </table>
//       </form>   
//   </div>
//   </div>
// )

// }