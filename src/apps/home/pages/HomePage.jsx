import { Grid } from "@mui/material"
import { AppLayout } from "../../../layout/AppLayout"
import { MostPopularCategories } from "../components/MostPopularCategories"
import { VacanciesOfPopularCategories } from "../components/VacanciesMostPopularCategories"
import { MostRecentVacancies } from "../components/MostRecentVacancies"


export const HomePage = () => {

  return (
    <AppLayout>
      <Grid
        container
        sx={{
          flexGrow: 1,
          justifyContent: 'center'
        }}
        className='animate__animated animate__faster animate__fadeIn'
      >
        <MostPopularCategories/>
        <VacanciesOfPopularCategories/>
        <MostRecentVacancies/>
      </Grid>
    </AppLayout>
  )
}


