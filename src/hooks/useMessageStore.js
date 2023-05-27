import { useDispatch } from "react-redux";

import { onClearMessages, onStartConversationSendMessage,
        onStartConversationSendMessageFailed,
        onLoadUserConversations,
        onLoadConversationMessages,
        onLoadConversationMessagesFailed,
        onSendMessageSuccess,
        onSendMessageFailed } from '../store/messages/messageSlice';
import { appApi } from "../api/appApi";

export const useMessageStore = () => {

    const dispatch = useDispatch();

    const startCreatingOrSendMessage = async(message, receiverId) => {

        const body = JSON.stringify({
            'message': message,
            'receiverId': receiverId
        });

        try {
            
            const { data } = await appApi.post('/api/messages/save-message',body,{
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });

            dispatch(onStartConversationSendMessage(data.msg));

        } catch (error) {
            dispatch(onStartConversationSendMessageFailed(error.response.data.msg));
        }
    } 

    const startClearingMessages = () => {
        dispatch(onClearMessages());
    }

    const startLoadingConversations = async(page) => {

        try {
            
            const { data } = await appApi.get(`/api/messages/my-messages?page=${page}`,{
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token')
                }
            });

            dispatch(onLoadUserConversations(data));

        } catch (error) {
            console.log(error);
        }

    }

    const startLoadingMessageConversation = async(page, conversationId) => {
        try {
            
            const { data } = await appApi.get(`/api/messages/get-conversation-messages/${conversationId}?page=${page}`,{
                headers: {
                    'Authorization': 'Bearer '+localStorage.getItem('token')
                }
            });

            dispatch(onLoadConversationMessages(data));

        } catch (error) {
            
            dispatch(onLoadConversationMessagesFailed(error.response.data.msg));

        }
    }

    const startReplyMessage = async(message, receiverId) => {

        const body = JSON.stringify({
            'message': message,
            'receiverId': receiverId
        });

        try {
            
            const { data } = await appApi.post('/api/messages/reply-message',body,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+localStorage.getItem('token')
                }
            });

            dispatch(onSendMessageSuccess(data));

        } catch (error) {
            dispatch(onSendMessageFailed(error.response.data.msg));
        }
    }

    return {
        startCreatingOrSendMessage,
        startClearingMessages,
        startLoadingConversations,
        startLoadingMessageConversation,
        startReplyMessage
    }
}