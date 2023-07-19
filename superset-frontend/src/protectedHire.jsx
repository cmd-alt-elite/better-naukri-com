import { Navigate, Outlet } from 'react-router-dom';
const ProtectedHire = ({recruiterState}) => {
  // let auth = {'token':true}
return (
    recruiterState ? <Outlet/> : <Navigate to='/'/>
  )
}

export default ProtectedHire;