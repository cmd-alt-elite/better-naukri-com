import styles from './jobLogin.module.css';
import bigRocket from '../assets/bigRocket.png';
import facebook from '../assets/facebook.png';
import apple from '../assets/apple.png';
import google from '../assets/google.png';

import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import firebaseConfig from "../config";

import { useNavigate } from 'react-router-dom';

const JobLogin = () => {
    const navigate = useNavigate();
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const provider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        sessionStorage.setItem("UID", result.user.uid);
        sessionStorage.setItem("displayName", result.user.displayName);
        sessionStorage.setItem("email", result.user.email);

        navigate('/hunting');

        console.log("credential: ", credential);
        console.log("token: ", token);
        console.log("user: ", user);
      }).catch((error) => {
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("credential: ", credential);
        console.log("error: ", error);
      });
  }

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