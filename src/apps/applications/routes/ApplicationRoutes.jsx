import { Route, Routes } from "react-router-dom"
import { NewApplication } from "../pages/NewApplication"
import { NotFound } from "../../../ui/NotFound"
import { useSelector } from "react-redux"
import { ApplicationsByVacancy } from "../pages/ApplicationsByVacancy"
import { ApplicationsByUser } from "../pages/ApplicationsByUser"


export const ApplicationRoutes = () => {

  const { status } = useSelector( state => state.auth );

  return (
    <Routes>
      {/* BASE URL: /application/ */}
      <Route path='new-application/:vacancyId' element={<NewApplication/>}/>
      {
        status == 'authenticated' ?
          <>
            <Route path='applications-by-job/:vacancyId' element={<ApplicationsByVacancy/>}/>
            <Route path='applications-by-user' element={<ApplicationsByUser/>}/>
          </>
        :
          <></>
      }
      <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}


