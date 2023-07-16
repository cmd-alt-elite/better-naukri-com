import MyNavbar from "../Reuse/Navbar.jsx";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const JobHome = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const loggedInUser = sessionStorage.getItem("UID");
        if (loggedInUser == null) {
            navigate('/')
        }
    }, []);

    return ( 
        <div>
            <MyNavbar></MyNavbar>
        </div>
    );
    
}
 
export default JobHome;