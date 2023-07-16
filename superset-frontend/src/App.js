import './App.css';

import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Landing from './Landing/landing';
import JobHome from './JobHome/jobHome';
import JobLogin from './JobLogin/jobLogin';
import HireLogin from './HireLogin/hireLogin';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />}/>
          {/* <Route path="searching" element={<Login />} /> */}
        <Route  path="/hunting" element={<JobHome />} />
        <Route  path="/hunting-login" element={<JobLogin />} />
        <Route  path="/hiring-login" element={<HireLogin />} />
        {/* <Route  path="/hunting-login" element={<JobHome />} /> */}

      </Routes>
      
    </div>  
  );
}

export default App;
