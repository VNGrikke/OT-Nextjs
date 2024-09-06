import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/usersSlice";

const store = configureStore({
    reducer: {
        users: userSlice
    }
});

export type RootType = ReturnType<typeof store.getState>;
export default store;