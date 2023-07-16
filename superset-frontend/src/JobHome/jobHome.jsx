import MyNavbar from "../Reuse/Navbar.jsx";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from 'axios';

const JobHome = () => {
    const navigate = useNavigate();

    const [allJobs, setAllJobs] = useState(null);

    useEffect(()=>{
        axios.get('https://better-naukri-com.onrender.com/jobs',{"Content-Type": "application/json"})
        .then(function (response) {
            setAllJobs(response.data.jobs);
            console.log(response.data.jobs)
        })
        .catch(function (error) {
            console.log(error);
        });    
    }, [])
    
    useEffect(() => {
        const loggedInUser = sessionStorage.getItem("UID");
        if (loggedInUser == null){
            navigate('/')
        }
    }, []);

    return ( 
        <div>
            <MyNavbar></MyNavbar>
            {allJobs &&
                allJobs.map(job => {
                    return (
                        <div key={job.companyId}>
                            Role: {job.role}
                            Compensation: {job.compensation}
                            Location: {job.location}
                        </div>
                    )
                })
            }
        </div>
    );
    
}
 
export default JobHome;