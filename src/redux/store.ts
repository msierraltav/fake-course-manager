import { configureStore } from "@reduxjs/toolkit";
import { coursesApi } from "./services/coursesApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import headerReducer from "./features/headerSlice";
import coursesReducer from "./features/courseSlice";

export const store = configureStore({
    reducer: {
        headerReducer,
        coursesReducer,
        [coursesApi.reducerPath] : coursesApi.reducer
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(coursesApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;