import { configureStore } from '@reduxjs/toolkit';

import { applicationSlice } from './application/applicationSlice';
import { authSlice } from './authentication/authSlice';
import { categorySlice } from './categories/categorySlice';
import { messageSlice } from './messages/messageSlice';
import { salariesSlice } from './salaries/salariesSlice';
import { statusSlice } from './status/statusSlice';
import { userSlice } from './user/userSlice';
import { vacancySlice } from './vacancies/vacancySlice';

export const store = configureStore({
    reducer: {
        application: applicationSlice.reducer,
        auth: authSlice.reducer,
        categories: categorySlice.reducer,
        salaries: salariesSlice.reducer,
        statuses: statusSlice.reducer,
        user: userSlice.reducer,
        vacancies: vacancySlice.reducer,
        messages: messageSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});


