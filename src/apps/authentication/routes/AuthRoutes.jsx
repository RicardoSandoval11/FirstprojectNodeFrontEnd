import { Routes, Route, Navigate } from 'react-router-dom';
import { ActivateAccount } from '../pages/ActivateAccount';
import { LoginPage } from '../pages/LoginPage';
import { RecoverPassword } from '../pages/RecoverPassword';
import { RegisterPage } from '../pages/RegisterPage';
import { UpdatePassword } from '../pages/UpdatePassword';


export const AuthRoutes = () => {
  return (
    <Routes>

        {/* BASE URL /auth/ */}
      <Route path='login' element={<LoginPage/>}/>
      <Route path='register' element={<RegisterPage/>}/>
      <Route path='recover-password' element={<RecoverPassword/>}/>
      <Route path='activate-account' element={<ActivateAccount/>}/>
      <Route path='update-password/:code' element={<UpdatePassword/>}/>

      {/* DEFAULT URL */}
      <Route path='/*' element={<Navigate to='login'/>}/>

    </Routes>
  )
}




