import { useState } from "react";
import {useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateStudent = () => {
    const navigate = useNavigate();

    const [studentid, setStudentID] = useState("");
    const [studentname, setStudentName] = useState("");
    const [department, setDepartment] = useState("");
    const [semester, setSemester] = useState("");

    useEffect(() => {
        setStudentID(localStorage.getItem("studentid"));
        setStudentName(localStorage.getItem("studentname"));
        setDepartment(localStorage.getItem("department"));
        setSemester(localStorage.getItem("semester"));
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const studentData = {
            studentid: studentid,
            studentname: studentname,
            department: department,
            semester: semester
        };

        axios.put("http://localhost:8000/update", studentData)
                .then((response)=>{
                    const { success, message } = response.data;
                    if (success) {
                        navigate("/");
                    }
                });
    }

    return(
        <div>
            <h3>Update Student</h3>
            <form onSubmit={handleFormSubmit}>

                <div>
                    <label htmlFor="studentid">Id</label>
                    <input type="number"
                        value={studentid}
                        onChange={(e) => setStudentID(e.target.value)}
                        id="studentid" />
                </div>
                <div>
                    <label htmlFor="studentname">Name</label>
                    <input type="text"
                        value={studentname}
                        onChange={(e) => setStudentName(e.target.value)}
                            id="studentname" />
                </div>
                <div>
                    <label htmlFor="department">Department</label>
                    <input type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                            id="department" />  
                </div>
                <div>
                    <label htmlFor="semester">Semester</label>
                    <input type="number"
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                            id="semester" />
                </div>
                <button>Update Student</button>
                </form>            
                </div>
    );
}

export default UpdateStudent;