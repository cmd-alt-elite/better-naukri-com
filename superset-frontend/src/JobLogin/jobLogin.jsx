import styles from './jobLogin.module.css';
import bigRocket from '../assets/bigRocket.png';
import facebook from '../assets/facebook.png';
import apple from '../assets/apple.png';
import google from '../assets/google.png';

import { useEffect, useState } from 'react';

import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import firebaseConfig from "../config";

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { applicantLogin } from '../redux/user';

const JobLogin = () => {
    const { isApplicant, isRecruiter, applicantID, recruiterID } = useSelector(state => state.user);
    const dispatch = useDispatch();
    
    const navigate = useNavigate();
    
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const provider = new GoogleAuthProvider();  

    const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        sessionStorage.setItem("UID", result.user.uid);
        sessionStorage.setItem("displayName", result.user.displayName);
        sessionStorage.setItem("email", result.user.email);
        sessionStorage.setItem("displayPic", result.user.photoURL);
        
        axios.post(
            'https://better-naukri-com.onrender.com/applicants',
            {
                "name": result.user.displayName,
                "uid": result.user.uid,
                "email": result.user.email
            }
        ).then((res)=>{
            sessionStorage.setItem("applicantID", res.data.applicantId);
            dispatch(applicantLogin(res.data.applicantId));
        })

        navigate('/hunting');
      }).catch((error) => {
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("credential: ", credential);
        console.log("error: ", error);
      });
    }

    useEffect(() => {
        const loggedInUser = sessionStorage.getItem("UID");
        if (loggedInUser != null && isApplicant) {
            navigate('/hunting');
        }
    }, []);

    return (
        <div className={styles.loginWrapper}>
            <div className={styles.heading}>
                <img src={bigRocket} alt="" />
                Super Superset
            </div>
            <div className={styles.subHeading}>
                Find Top Jobs
            </div>
            <div className={styles.fb}>
                <img src={facebook} alt="" />
                Continue with Facebook
            </div>
            <div className={styles.google} onClick={signInWithGoogle}>
                <img src={google} alt="" />
                Continue with Google
            </div>
            <div className={styles.apple}>
                <img src={apple} alt="" />
                Continue with Apple
            </div>
        </div>
    );
}
 
export default JobLogin;