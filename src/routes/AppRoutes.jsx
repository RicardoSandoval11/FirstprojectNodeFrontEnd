import { Routes, Route } from 'react-router-dom';


import React, { useEffect } from 'react'
import { AuthRoutes } from '../apps/authentication/routes/AuthRoutes';
import { HomeRoutes } from '../apps/home/routes/HomeRoutes';
import { useAuthStore } from '../hooks/useAuthStore';
import { useSelector } from 'react-redux';
import { ProfilePage } from '../apps/profile/pages/ProfilePage';
import { VacancyRoutes } from '../apps/vacancies/routes/VacancyRoutes';
import { UpdateMyInformation } from '../apps/profile/pages/UpdateMyInformation';
import { ApplicationRoutes } from '../apps/applications/routes/ApplicationRoutes';
import { CategoriesRoutes } from '../apps/categories/routes/CategoriesRoutes';
import { MessagesRoutes } from '../apps/messages/routes/MessagesRoutes';

export const AppRoutes = () => {

  const { status } = useSelector( state => state.auth );

  const { startCheckingToken } = useAuthStore();

  useEffect(() => {
    startCheckingToken();
  },[]);

  return (
    <Routes>

        {/* Home Routes */}
        <Route path='/*' element={<HomeRoutes/>}/>
        <Route path='/vacancy/*' element={<VacancyRoutes/>}/>
        <Route path='/categories/*' element={<CategoriesRoutes/>}/>

        {/* Authentication Routes */}
        {
          status == 'authenticated'?
            <>
              <Route path='/my-profile' element={<ProfilePage/>}/>
              <Route path='/update-information' element={<UpdateMyInformation/>}/>
              <Route path='/application/*' element={<ApplicationRoutes/>}/>
              <Route path='/messages/*' element={<MessagesRoutes/>}/>
            </>
          :
            <Route path='/auth/*' element={<AuthRoutes/>}/>
        }
    </Routes>
  )
}

