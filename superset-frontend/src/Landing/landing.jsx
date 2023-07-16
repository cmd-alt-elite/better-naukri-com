import styles from './landing.module.css';
import bigRocket from '../assets/bigRocket.png';
import hire from '../assets/hire.png';
import job from '../assets/job.png';

const Landing = () => {
    return ( 
        <div className={styles.landingContainer}>
            <div className={styles.headingContainer}>
                <div className={styles.heading}>
                    <img src={bigRocket} alt="" />
                    Better Superset
                </div>
            </div>
            <div className={styles.decisionWrapper}>
                <div className={styles.hireBtn}>
                    <img src={hire} alt="" />
                    <p>
                        I want to hire!
                    </p>
                </div>
                <div className={styles.jobBtn}>
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