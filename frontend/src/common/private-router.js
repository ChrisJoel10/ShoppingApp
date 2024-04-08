
import { Navigate, Outlet } from 'react-router-dom'

export const PrivateRoutes = () => {
    let token = localStorage.getItem("user");
    let auth = {'token': token != null}
  return (
      auth.token ? <Outlet/> : <Navigate to='/login'/>
    )
  }