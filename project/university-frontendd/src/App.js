import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DegreeList from './components/DegreeList';
import DegreeDetails from './components/DegreeDetails';
import CreateDegree from './components/CreateDegree';
import Home from './components/Home';
import CohortList from './components/CohortList';
import SingleCohort from './components/SingleCohort';
import CreateCohort from './components/CreateCohort';
import ModulesByCohort from './components/ModulesByCohort';
import ModuleList from './components/ModuleList';
import SingleModule from './components/SingleModule';
import ModuleStudents from './components/ModuleStudents';
import CreateModule from './components/CreateModule';
import StudentDetail from './components/StudentDetail';
import CreateStudent from './components/CreateStudent';
import SetGrade from './components/SetGrade';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchStudent from './components/SearhStudent';



function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/degrees" element={<DegreeList />} />
        <Route path="/degrees/:degreeName" element={<DegreeDetails />} />
        <Route path="/create-degree" element={<CreateDegree />} />

        <Route path="/cohorts" element={<CohortList />} />
        <Route path="/cohorts/:cohortId" element={<SingleCohort />} />
        <Route path="/create-cohort" element={<CreateCohort />} />
        <Route path="/cohorts/:cohortId/modules" element={<ModulesByCohort />} />

        <Route path="/modules" element={<ModuleList />} />
        <Route path="/modules/:moduleCode" element={<SingleModule />} />
        <Route path="/modules/:moduleCode/students" element={<ModuleStudents />} />
        <Route path="/modules/create" element={<CreateModule />} />

        <Route path="/students/:studentId" element={<StudentDetail />} />
        <Route path="/students/create" element={<CreateStudent />} />
        <Route path="/set-grade" element={<SetGrade />} />
        <Route path="/search-student" element={<SearchStudent />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
