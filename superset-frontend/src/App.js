import './App.css';

import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Landing from './Landing/landing';
import JobHome from './JobHome/jobHome';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />}/>
          {/* <Route path="searching" element={<Login />} /> */}
        <Route  path="/hunting" element={<JobHome />} />

      </Routes>
      
    </div>  
  );
}

export default App;
