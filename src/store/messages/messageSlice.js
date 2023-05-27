import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
    name: 'message',
    initialState: {
        status: 'searching',
        userConversations: null,
        conversationMessages: [],
        loadConversationFailedMsg: null,
        sendMessageSuccessMsg: null,
        sendMessageFailedMsg: null,
        totalPages: null,
        totalElements: null,
        successSendMessage: null,
        failedSendMessage: null
    },
    reducers: {
        onStartConversationSendMessage: ( state, { payload } ) => {
            state.sendMessageSuccessMsg = payload;
            state.status = 'completed';
        },
        onStartConversationSendMessageFailed: ( state, { payload } ) => {
            state.sendMessageFailedMsg = payload;
            state.status = 'completed';
        },
        onLoadUserConversations: ( state, { payload } ) => {
            state.userConversations = payload.conversations;
            state.totalPages = payload.totalPages;
            state.totalElements = payload.totalConversations;
            state.status = 'completed';
        },
        onLoading: ( state ) => {
            state.status = 'loading';
        },
        onClearMessages: ( state ) => {
            state.sendMessageFailedMsg = null;
            state.sendMessageSuccessMsg = null;
            state.loadConversationFailedMsg = null;
            state.successSendMessage = null;
            state.failedSendMessage = null;
        },
        onLoadConversationMessages: ( state, { payload } ) => {

            payload.messages.forEach(message => {

                const exists = state.conversationMessages.some( appMsg => appMsg.id == message.id );

                if(!exists){
                    state.conversationMessages.push(message);
                }

            })
            state.totalPages = payload.totalPages;
            state.totalElements = payload.totalMessages;
            state.status = 'completed';
        },
        onLoadConversationMessagesFailed: ( state, { payload } ) => {
            state.loadConversationFailedMsg = payload;
            state.status = 'completed';
        },
        onSendMessageSuccess: ( state, { payload } ) => {
            state.successSendMessage = payload.msg;
            state.conversationMessages.unshift(payload.message);
            state.status = 'completed';
        },
        onSendMessageFailed: ( state, { payload } ) => {
            state.failedSendMessage = payload;
            state.status = 'completed'
        }
    }
});

export const {
    onStartConversationSendMessage,
    onStartConversationSendMessageFailed,
    onLoadUserConversations,
    onLoading,
    onClearMessages,
    onLoadConversationMessages,
    onLoadConversationMessagesFailed,
    onSendMessageSuccess,
    onSendMessageFailed
} = messageSlice.actions;