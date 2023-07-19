import './App.css';

import { Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Landing from './Landing/landing';
import JobLogin from './JobLogin/jobLogin';
import HireLogin from './HireLogin/hireLogin';
import JobHome from './JobHome/jobHome';
import JobProfile from './Profile/jobProfile';
import HireProfile from './Profile/hireProfile';
import CreateRole from './CreateRole/createRole';
import ProtectedJob from './protectedJob';
import ProtectedHire from './protectedHire';
import { useState } from 'react';

function App() {
  const[applicantState, setApplicantState] = useState();
  const[recruiterState, setRecruiterState] = useState();

  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Landing />}/>
          <Route element={<ProtectedJob applicantState={applicantState}/>}>
              <Route path='/hunting' element={<JobHome setApplicantState={setApplicantState}/>} />
              <Route path='/hunting/:id' element={<JobProfile setApplicantState={setApplicantState}/>} />
          </Route>
          <Route element={<ProtectedHire recruiterState={recruiterState}/>}>
            <Route path="/hiring/:id" element={<HireProfile setRecruiterState={setRecruiterState}/>} />
          </Route>
          <Route path="/hunting-login" element={<JobLogin setApplicantState={setApplicantState}/>} />
          <Route path="/hiring-login" element={<HireLogin setRecruiterState={setRecruiterState}/>} />
          <Route path="/create-role" element={<CreateRole/>} />
        </Routes>
    </div>  
  );
}

export default App;
