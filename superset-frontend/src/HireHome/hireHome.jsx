import { useEffect } from "react";
import MyNavbar from "../Reuse/Navbar";

import { useNavigate } from "react-router-dom";

import { useSelector } from 'react-redux';

const HireHome = () => {
    const { isApplicant, isRecruiter, applicantID, recruiterID } = useSelector(state => state.user);

    const navigate = useNavigate();

    useEffect(() => {
        if(!isRecruiter)navigate('/');
    }, []);

    return (
        <div>
            <MyNavbar/>
        </div>
    );
}
 
export default HireHome;