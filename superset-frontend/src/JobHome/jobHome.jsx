import styles from './jobHome.module.css';

import MyNavbar from "../Reuse/Navbar.jsx";

import { useEffect, useState, useLayoutEffect } from "react";

import { useNavigate } from "react-router-dom";
import axios from 'axios';
import ReactPaginate from 'react-paginate';

import { useSelector } from 'react-redux';

const JobHome = () => {
    const { isApplicant, isRecruiter, applicantID, recruiterID } = useSelector(state => state.user);

    const navigate = useNavigate();

    const [allJobs, setAllJobs] = useState(null);
    // PAGINATION
    const [jobOffset, setJobOffset] = useState(0);
    const jobsPerPage = 7;
    const endOffset = jobOffset + jobsPerPage;
    const [currentJobs, setCurrentJobs] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [num, setNum] = useState(0);

    useEffect(()=>{
        axios.get('https://better-naukri-com.onrender.com/jobs',{"Content-Type": "application/json"})
        .then(function (response) {
            setAllJobs(response.data.jobs);
            console.log(`Loading items from ${jobOffset} to ${endOffset}`);
            
            setCurrentJobs(response.data.jobs.slice(jobOffset, endOffset));
            setPageCount(Math.ceil(response.data.jobs.length / jobsPerPage));
            setNum(response.data.jobs.length);
        })
        .catch(function (error) {
            console.log(error);
        });    
    }, [])

    // useLayoutEffect(()=>{
    //     if(sessionStorage.getItem("applicantID") == null){
    //         console.log(isApplicant);
    //         navigate('/');
    //     }
    // }, [])
    
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * jobsPerPage) % allJobs.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setJobOffset(newOffset);
    };

    return ( 
        <div>
            <MyNavbar isApplicant={isApplicant}/>
            <div className={styles.flexWrapper}>
                <div className={styles.leftPanel}></div>
                <div className={styles.centrePanel}>
                    {allJobs && currentJobs &&
                        currentJobs.map(job => {
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
                    <ReactPaginate
                        className={styles.paginate}
                        breakLabel="..." 
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="< previous"
                        renderOnZeroPageCount={null}
                        containerClassName={"pagination justify-content-center"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        activeClassName={"active"}
                    />
                </div>
                <div className={styles.rightPanel}></div>
            </div>
        </div>
    );
    
}

export default JobHome;