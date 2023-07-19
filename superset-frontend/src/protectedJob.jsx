import { Navigate, Outlet } from 'react-router-dom';
const ProtectedJob = ({applicantState}) => {
  // let auth = {'token':true}
return (
    applicantState ? <Outlet/> : <Navigate to='/'/>
  )
}

export default ProtectedJob;