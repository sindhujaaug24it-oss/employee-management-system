const express = require("express");

const cors = require("cors");

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017")
    .then(() => console.log("Database Connected!"))
    .catch((error) => console.log(error));

const app = express();

app.use(express.json());

app.use(cors());

const studentSchema = new mongoose.Schema({
    studentid: { type: Number, required: true, unique: true },
    studentname: { type: String, required: true },
    department: { type: String, required: true },
    semester: { type: Number, required: true },
});

const Student = mongoose.model("student", studentSchema);


// 1. Add Students

app.post("/add", (req, res) => {

    const { studentid, studentname, department, semester } = req.body;

    const newStudent = new Student({
        studentid: studentid,
        studentname: studentname,
        department: department,
        semester: semester
    });

    newStudent.save()
        .then(() => {
            res.send({ success: true, message: "Created" });
        })
        .catch((error) => res.send(error));

});


// 2. List Students

app.get("/list", (req, res) => {

    Student.find()
        .then((students) => res.send(students))
        .catch((error) => res.send(error));

});


// 3. Update Students

app.put("/update", (req, res) => {

    const { studentid, studentname, department, semester } = req.body;

    Student.updateOne(
        { studentid: studentid },
        {
            $set: {
                studentname: studentname,
                department: department,
                semester: semester
            }
        }
    )
        .then(() => res.send({ success: true, message: "Updated" }))
        .catch((error) => res.send(error));

});


// 4. Delete Students

app.delete("/delete", (req, res) => {

    const { studentid } = req.body;

    Student.deleteOne({ studentid: studentid })
        .then((message) => res.send({ success: true, message: "Deleted" }))
        .catch((error) => res.send(error));

});


app.listen(8000, () => console.log("Server is running..."));