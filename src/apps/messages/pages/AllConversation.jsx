import { useEffect, useState } from "react";
import { AppLayout } from "../../../layout/AppLayout";
import { useMessageStore } from "../../../hooks/useMessageStore";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import InfiniteScroll from 'react-infinite-scroll-component';
import { DisplayMessage } from "../components/DisplayMessage";
import { Grid, TextField, Button } from "@mui/material";
import { Checking } from "../../../ui/Checking";
import Swal from 'sweetalert2';
import CircularProgress from '@mui/material/CircularProgress';

export const AllConversation = () => {

    const { conversationId } = useParams();

    const navigate = useNavigate();

    const { startLoadingMessageConversation, startClearingMessages, startReplyMessage } = useMessageStore();

    const [page, setPage] = useState(0);

    useEffect(() => {
        startLoadingMessageConversation(page, conversationId);
    },[page]);

    const { 
            totalPages, 
            conversationMessages, 
            loadConversationFailedMsg,
            totalElements,
            status,
            successSendMessage,
            failedSendMessage } = useSelector( state => state.messages );
    
    useEffect(() => {
        if(loadConversationFailedMsg != null){
            startClearingMessages();
            navigate('/');
        }
    },[loadConversationFailedMsg]);

    const increasePage = () => {
      if(totalPages > page){
        setPage(page+1);
      }
    }

    // reply message handler
    const [replyMsg, setReplyMsg] = useState('');

    const onReplyMsgChange = (event) => {
      setReplyMsg(event.target.value);
    }

    let receiverId;

    for (let i = 0; i < conversationMessages.length; i++) {
      const msg = conversationMessages[i];
      if(msg.receiverId != localStorage.getItem('userId')){
        receiverId = msg.receiverId;
        break;
      }
    }


    const onSendReplyMsg = () => {
      if(replyMsg != ''){
        startReplyMessage(replyMsg, receiverId);
        setReplyMsg('');
        setPage(0);
        startLoadingMessageConversation(page, conversationId);
      }else{
        Swal.fire('Empty Reply', 'You cannot send empty messages', 'warning');
      }
    }

    // handle send message result
    useEffect(() => {
      if(failedSendMessage != null){
        Swal.fire('Message sent failed', failedSendMessage, 'success');
        startClearingMessages();
      }
    },[failedSendMessage]);


  return (
    <AppLayout>
      {
        conversationMessages != null ?
        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          <Grid
            item
            sx={{
              display: 'flex',
              justifyContent: 'center',
              margin: 2,
              padding: 2,
              width: '100%'
            }}
          >
            <TextField
              variant="outlined"
              type="text"
              placeholder='Reply'
              sx={{
                marginRight: 1
              }}
              onChange={onReplyMsgChange}
              value={replyMsg}
            />
            <Button 
              variant="contained" 
              onClick={onSendReplyMsg} 
              disabled={status == 'searching'}
            >
              Send
            </Button>
          </Grid>
          <Grid
            container
            sx={{
              display: 'flex',
              maxWidth: 750,
              marginX: 'auto',
              boxShadow: 3,
              borderRadius: '10px',
              padding: 2,
              justifyContent: 'center'
            }}
          >
            <InfiniteScroll
              dataLength={conversationMessages.length}
              next={increasePage}
              hasMore={conversationMessages.length != totalElements}
              loader={<Grid sx={{display: 'flex', justifyContent: 'center', marginY: 1}}><CircularProgress /></Grid>}
              endMessage={<></>}
              height = {800}
            >
              {
                conversationMessages.map((message) => (
                  <DisplayMessage message={message} key={message.id}/>
                ))
              }
            </InfiniteScroll>

          </Grid>
        </Grid>
        :
          <Checking/>
      }
    </AppLayout>
  )
}

