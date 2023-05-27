import { Grid } from "@mui/material"
import { AppLayout } from "../../../layout/AppLayout"
import { ProfileActions } from "../components/ProfileActions"
import { ProfileHeader } from "../components/ProfileHeader"
import { UserDescription } from "../components/UserDescription"
import { useSelector } from "react-redux"
import { useVacancyStore } from "../../../hooks/useVacanciesStore"
import { useEffect } from "react"
import Swal from "sweetalert2"
import { MyVacancies } from "../../vacancies/pages/MyVacancies"
import { useUserStore } from "../../../hooks/useUserStore"
import { Checking } from "../../../ui/Checking"


export const ProfilePage = () => {

  const { startLoadingUserInformation, startClearingMessages: clearUserMsgs } = useUserStore();

  const { startClearingMessages } = useVacancyStore();

  const { 
      createVacancySuccessMsg, 
      createVacancyFailedMsg,
      UpdateVacancyMsg,
      UpdateVacancyFailed } = useSelector( state => state.vacancies );
  const { userDetails, updateUserInformationMsg, updateUserInformationFailedMsg } = useSelector( state => state.user );

  useEffect(() => {
    startLoadingUserInformation();
  },[]);

  useEffect(() => {
    if(createVacancySuccessMsg != null){
      Swal.fire('Vacancy Created', createVacancySuccessMsg, 'success');
      startClearingMessages();
    }
  },[createVacancySuccessMsg]);

  useEffect(() => {
    if(createVacancyFailedMsg != null){
      Swal.fire('Vacancy Create Failed', createVacancyFailedMsg, 'error');
      startClearingMessages();
    }
  },[createVacancyFailedMsg]);

  useEffect(() => {
    if(UpdateVacancyMsg != null){
      Swal.fire('Vacancy Updated', UpdateVacancyMsg, 'success');
      startClearingMessages();
    }
  },[UpdateVacancyMsg]);

  useEffect(() => {
    if(UpdateVacancyFailed != null){
      Swal.fire('Update Vacancy Failed', UpdateVacancyFailed, 'error');
      startClearingMessages();
    }
  },[UpdateVacancyFailed]);

  useEffect(() => {
    if(updateUserInformationMsg != null){
      Swal.fire('Information Updated', updateUserInformationMsg, 'success');
      clearUserMsgs();
    }
  },[updateUserInformationMsg]);

  useEffect(() => {
    if(updateUserInformationFailedMsg != null){
      Swal.fire('Update Information Failed', updateUserInformationFailedMsg, 'error');
      clearUserMsgs();
    }
  },[updateUserInformationFailedMsg]);

  return (
    <AppLayout>
      {
        userDetails == null ?
          <Checking/>
        :
          <Grid
              container
              sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  margin: 2,
                  padding: 3,
                  maxWidth: 1200,
                  marginX: 'auto'
              }}
              className='animate__animated animate__faster animate__fadeIn'
          >
              <ProfileHeader user={userDetails}/>
              <ProfileActions/>
              <UserDescription user={userDetails}/>
              <MyVacancies/>
          </Grid>
      }
    </AppLayout>
  )
}

