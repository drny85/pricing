import { configureStore } from '@reduxjs/toolkit';
import dataSlide from './dataSlide';
import fiosData from './fiosData';

import themeSlide from './themeSlide';
import wireless from './wirelessSlide';
// ...

export const store = configureStore({
    reducer: {
        theme: themeSlide,
        data: dataSlide,
        fiosData: fiosData,
        wireless: wireless,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
