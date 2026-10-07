import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddStudent = () => {

    const navigate = useNavigate();

    const [studentid, setStudentId] = useState("");
    const [studentname, setStudentName] = useState("");
    const [department, setDepartment] = useState("");
    const [semester, setSemester] = useState("");

    const handleFormSubmit = (e) => {
        const studentData = {
            studentid: studentid,
            studentname: studentname,
            department: department,
            semester: semester
        };

        axios.post("http://localhost:8000/add", studentData)
             .then((response)=>{
                const { success, message } = response.data;
                if (success) {
                    navigate("/");
                }


             });

    }

    
    return(
        <div>
            <h3>Add Student</h3>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="studentid">Id</label>
                    <input type="number"
                        value={studentid}
                        onChange={(e) =>setStudentId(e.target.value)}
                        id="studentid"
                         /> 

                </div>
                <div>
                    <label htmlFor="studentname">Name</label>
                    <input type="text"
                            value={studentname}
                            onChange={(e) =>setStudentName(e.target.value)}
                            id="studentname"
                            />
                </div>
                <div>
                    <label htmlFor="department">Department</label>
                    <input type="text"
                            value={department}
                            onChange={(e) =>setDepartment(e.target.value)}
                            id="department"
                            />
                </div>
                <div>
                    <label htmlFor="semester">Semester</label>
                    <input type="number"
                            value={semester}
                            onChange={(e) =>setSemester(e.target.value)}
                            id="semester"
                            />
                </div>
                <button type="submit">Add Student</button>
            </form>
            </div>
    );
}

export default AddStudent;