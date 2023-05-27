import { Route, Routes } from 'react-router-dom';

import { CreateVacancyPage } from '../pages/CreateVacancyPage';
import { NotFound } from '../../../ui/NotFound';
import { useSelector } from 'react-redux';
import { EditVacancyPage } from '../pages/EditVacancyPage';
import { VacancyDetailsPage } from '../pages/VacancyDetailsPage';
import { VacanciesByCategory } from '../pages/VacanciesByCategory';
import { AllVacancies } from '../pages/AllVacancies';

export const VacancyRoutes = () => {

    const { status } = useSelector( state => state.auth );

  return (
    <Routes>
      {/* BASE URL: /vacancy/ */}
      {
        status == 'authenticated'?
            <>
                <Route path='add-new' element={<CreateVacancyPage/>}/>
                <Route path='edit/:vacancyId' element={<EditVacancyPage/>}/>
            </>
        :
            <></>
      }

      {/* ANY OTHER URL */}
      <Route path='details/:vacancyId' element={<VacancyDetailsPage/>}/>
      <Route path='vacancies-by-category/:categoryId' element={<VacanciesByCategory/>}/>
      <Route path='all' element={<AllVacancies/>}/>
      <Route path='*' element={<NotFound/>}/>

    </Routes>
  )
}

