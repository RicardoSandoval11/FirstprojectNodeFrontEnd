import { Routes, Route, Navigate } from "react-router-dom"
import { HomePage } from "../pages/HomePage"


export const HomeRoutes = () => {
  return (
    <Routes>

        {/* BASE URL: / */}
        <Route path=''element={<HomePage/>}/>

        {/* DEFAULT URL */}
        <Route path='*' element={<Navigate to=''/>}/>

    </Routes>
  )
}


