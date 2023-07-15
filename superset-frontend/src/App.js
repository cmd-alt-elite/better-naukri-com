import './App.css';
import Landing from './Landing/landing';
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />}>
          
        </Route>
      </Routes>
      
    </div>  
  );
}

export default App;
