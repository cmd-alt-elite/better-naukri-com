import styles from './jobLogin.module.css';
import bigRocket from '../assets/bigRocket.png';
import facebook from '../assets/facebook.png';
import apple from '../assets/apple.png';
import google from '../assets/google.png';

const JobLogin = () => {
    return (
        <div className={styles.loginWrapper}>
            <div className={styles.heading}>
                <img src={bigRocket} alt="" />
                Better Superset
            </div>
            <div className={styles.subHeading}>
                Find Top Jobs
            </div>
            <div className={styles.fb}>
                <img src={facebook} alt="" />
                Continue with Facebook
            </div>
            <div className={styles.google}>
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