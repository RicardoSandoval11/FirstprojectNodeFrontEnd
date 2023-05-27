import { Grid, Alert, Button } from "@mui/material";

import { AppLayout } from "../../../layout/AppLayout";
import { useMessageStore } from "../../../hooks/useMessageStore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Checking } from "../../../ui/Checking";
import { DisplayConversation } from "../components/DisplayConversation";

export const MyConversations = () => {

    const { startLoadingConversations } = useMessageStore();

    const [page, setPage] = useState(0);

    useEffect(() => {
        startLoadingConversations(page);
    },[page]);

    const { userConversations,  status, totalPages } = useSelector( state => state.messages );

    const Pagination = () => {

        const onPressPage = (event) => {
            setPage(event.target.innerHTML.slice(0,1)-1);
        }

        const pages = [];

        for (let page = 0; page < totalPages; page++) {
            pages.push(page);
            
        }

        return (
            <Grid
                item
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    marginY: 2
                }}
            >
                {
                    pages.map(Page => {
                    return (
                            <Button
                                variant='contained'
                                sx={{
                                    color: 'white',
                                    backgroundColor: 'primary.main',
                                    marginX:1
                                }}
                                onClick={onPressPage}
                                disabled={Page == page}
                                key={Page}
                            >
                                {Page+1}
                            </Button>
                    )})     
                }
            </Grid>
        )
    }

  return (
    <AppLayout>
        {
            userConversations == null || status == 'searching' ?
                <Checking/>
            :
                <Grid
                    container
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        height: '100vh',
                        alignItems: 'start'
                    }}
                    className="animate__animated animate__fadeIn animate__faster"
                >
                    {
                        userConversations.length > 0 ?

                            userConversations.map((conversation) => (

                                <DisplayConversation conversation={conversation} key={conversation.id}/>
                            ))
                        :
                            <Alert severity="info">You don't have conversations yet</Alert>

                    }
                    {
                        totalPages > 1 ?
                            <Pagination/>
                        :
                            <></>
                    }
                </Grid>
        }
    </AppLayout>
  )
}


