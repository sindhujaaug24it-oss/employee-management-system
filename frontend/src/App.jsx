import { BrowserRouter, Routes, Route } from "react-router-dom";

import ListStudents from "./components/ListStudents";
import AddStudent from "./components/AddStudent";
import UpdateStudent from "./components/UpdateStudent";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListStudents />} />
          <Route path="/addstudent" element={<AddStudent />} />
          <Route path="/updatestudent" element={<UpdateStudent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;