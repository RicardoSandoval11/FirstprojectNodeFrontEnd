import './AppStyles.css'
import { AppRoutes } from './routes/AppRoutes'
import { JobsAppTheme } from './theme/JobsAppTheme'

export const JobsApp = () => {

  return (
    <JobsAppTheme>
      <AppRoutes/>
    </JobsAppTheme>
  )
}

