import { Routes, Route } from "react-router-dom"
import { AllCategoriesPage } from "../pages/AllCategoriesPage"


export const CategoriesRoutes = () => {
  return (
    <Routes>
      {/* BASE URL : /categories/ */}
      <Route path='all-categories' element={<AllCategoriesPage/>}/>
    </Routes>
  )
}


