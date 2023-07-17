import axios from "axios";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

const JobProfile = () => {
    const {id} = useParams();
    const [displayName, setDisplayName] = useState();
    const [email, setEmail] = useState();
    const [uid, setUid] = useState();

    useEffect(()=>{
        axios.get(
            `https://better-naukri-com.onrender.com/applicants/${id}`
        ).then((res)=>{
            setDisplayName(res.data.details.name);
            setEmail(res.data.details.email);
            setUid(res.data.details.uid);
        })
    }, [])

    return ( 
        <div>
            Name: {displayName}
            <br />
            Email: {email}
        </div>
    );
}
 
export default JobProfile;