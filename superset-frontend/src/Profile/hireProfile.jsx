import axios from "axios";
import styles from "./jobProfile.module.css";
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import MyNavbar from "../Reuse/Navbar";

const HireProfile = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [displayName, setDisplayName] = useState();
    const [email, setEmail] = useState();
    const [uid, setUid] = useState();

    useEffect(()=>{
        axios.get(
            `https://better-naukri-com.onrender.com/recruiters/${id}`
        ).then((res)=>{
            setDisplayName(res.data.details.name);
            setEmail(res.data.details.email);
            setUid(res.data.details.uid);
        }).catch((e)=>{
            navigate("/hiring");
            alert("Incorrect Recruiter ID.");
        })
    }, [])

    return ( 
        <div className={styles.profileWrapper}>
            <MyNavbar></MyNavbar>
            <div className={styles.flexProfile}>
                <div className={styles.leftPanel}>
                    <div className={styles.profileInfo}>
                        <img src={sessionStorage.getItem("displayPic")} alt="" />
                        <br />
                        <h3>{displayName}</h3>
                        <br />
                        <p>{email}</p>
                    </div>
                </div>
                
                {/* <div className={styles.applicationWrapper}>
                    <p>My Applications</p>
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
                </div> */}
            </div>
        </div>
    );
}
 
export default HireProfile;