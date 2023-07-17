import axios from "axios";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

const JobProfile = () => {
    const {id} = useParams();
    const [displayName, setDisplayName] = useState();
    const [email, setEmail] = useState();
    const [uid, setUid] = useState();
    const [applications, setApplications] = useState();

    useEffect(()=>{
        axios.get(
            `https://better-naukri-com.onrender.com/applicants/${id}`
        ).then((res)=>{
            setDisplayName(res.data.details.name);
            setEmail(res.data.details.email);
            setUid(res.data.details.uid);
        })

        axios.get(
            `https://better-naukri-com.onrender.com/applications/applicant/${id}`
        ).then((res)=>{
            setApplications(res.data.applications)
        })
    }, [])

    return ( 
        <div>
            Name: {displayName}
            <br />
            Email: {email}
            <br />
            Applications:
            {
                applications &&
                    applications.map((application)=>{
                        return(
                            <div>
                                {application.jobId}
                            </div>
                        )
                })
            }
        </div>
    );
}
 
export default JobProfile;