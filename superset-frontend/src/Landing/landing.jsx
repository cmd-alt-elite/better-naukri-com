import styles from './landing.module.css';

const Landing = () => {
    return ( 
        <div className={styles.landingContainer}>
            <div className={styles.headingContainer}>
                <div className={styles.heading}>
                    Better Superset
                </div>
            </div>
            <div className={styles.decisionWrapper}>
                <div className={styles.hireBtn}><p>I want to hire!</p></div>
                <div className={styles.jobBtn}><p>I want a job!</p></div>
            </div>
        </div>
    );
}
 
export default Landing;