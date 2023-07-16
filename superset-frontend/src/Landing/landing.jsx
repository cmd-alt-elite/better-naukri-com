import styles from './landing.module.css';
import bigRocket from '../assets/bigRocket.png';
import hire from '../assets/hire.png';
import job from '../assets/job.png';

import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();
    const onJobClick = () => {
        navigate('/hunting-login');
    }
    const onHireClick = () => {
        navigate('/hiring-login');
    }
    return ( 
        <div className={styles.landingContainer}>
            <div className={styles.headingContainer}>
                <div className={styles.heading}>
                    <img src={bigRocket} alt="" />
                    Better Superset
                </div>
            </div>
            <div className={styles.decisionWrapper}>
                <div className={styles.hireBtn} onClick={onHireClick}>
                    <img src={hire} alt="" />
                    <p>
                        I want to hire!
                    </p>
                </div>
                <div className={styles.jobBtn} onClick={onJobClick}>
                    <img src={job} alt="" />
                    <p>
                        I want a job!
                    </p>
                </div>
            </div>
        </div>
    );
}
 
export default Landing;