import './App.css';

import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Landing from './Landing/landing';
import JobLogin from './JobLogin/jobLogin';
import HireLogin from './HireLogin/hireLogin';
import JobHome from './JobHome/jobHome';
import HireHome from './HireHome/hireHome';
import JobProfile from './Profile/jobProfile';
import { useState } from 'react';

function App() {
  const [isApplicant, setIsApplicant] = useState();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/hunting" element={<JobHome setIsApplicant={setIsApplicant} isApplicant={isApplicant}/>} />
        <Route path="/hiring" element={<HireHome />} />
        <Route path="/hunting-login" element={<JobLogin setIsApplicant={setIsApplicant} isApplicant={isApplicant}/>} />
        <Route path="/hiring-login" element={<HireLogin setIsApplicant={setIsApplicant} isApplicant={isApplicant}/>} />
        <Route path="/hunting/:id" element={<JobProfile/>} />
      </Routes>
      
    </div>  
  );
}

export default App;
