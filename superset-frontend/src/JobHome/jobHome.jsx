import styles from './jobHome.module.css';

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
            <div className={styles.flexWrapper}>
                <div className={styles.leftPanel}></div>
                <div className={styles.centrePanel}>
                    {allJobs &&
                        allJobs.map(job => {
                            return (
                                <div key={job.companyId} className={styles.jobWrapper}>
                                    <div className={styles.top}>
                                        Role: {job.role}
                                        <div className={styles.button}>
                                            Apply
                                        </div>
                                    </div>
                                    <div className={styles.bottom}>
                                        <p>Salary: ₹{job.compensation.toLocaleString("en-IN")}</p>
                                        <p>Location: {job.location}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={styles.rightPanel}></div>
            </div>
        </div>
    );
    
}
 
export default JobHome;