import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ListStudents = ()=> {
    const [students, setStudents] = useState(null);
    const [revision, setRevision] = useState(0);

    useEffect(()=>{
        axios.get("http://localhost:8000/list", {})
            .then((result)=>{
                setStudents(result.data)
            });
    }, [revision]);

    const handleUpdate = (studentid,studentname,department,semester) =>{
        localStorage.setItem("studentid", studentid);
        localStorage.setItem("studentname", studentname);
        localStorage.setItem("studentid", department);
        localStorage.setItem("semester", semester);
    }

    const handleDelete = (studentid) =>{
        const sure = confirm("Are your sure want to delete?")

        if(sure){
            axios.delete("http://localhost:8000/delete",
            { data: { studentid:parseInt(studentid)}})
                .then(()=>{setRevision(revision+1)});
        }
    }
  return(
    <div>
      <h3>List Students</h3>
      <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Semester</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {
                students && students.length > 0
                ?
                students.map((student) => {
                    return (
                        <tr key={student._id}>
                            <td>{student.studentid}</td>
                            <td>{student.studentname}</td>
                            <td>{student.department}</td>
                            <td>{student.semester}</td>
                            <td>
                                <Link to={"/updatestudent"}>
                                    <button onClick={()=>
                                        handleUpdate(student.studentid,
                                        student.studentname, student.
                                        department, student.semester)}>
                                            Update
                                    </button>
                                </Link>
                                <button onClick={()=> handleDelete
                                    (student.studentid)}>
                                        Delete
                                    </button>
                            </td>
                        </tr>
                    )
                }):
                <tr>
                    <td colspan={4}>No Students Found!</td>
                </tr>
            }
        </tbody>
      </table>

      <Link to ={"/addstudent"}>
            <button>Add Student</button>
      </Link>
    </div>
  );
}

export default ListStudents;