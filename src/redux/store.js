import { configureStore } from "@reduxjs/toolkit";


import userReducer from "./userSlice";
const store = configureStore({

    reducer: {
        user: userReducer,
        theme: themeReducer,   // theme state

    }
})
export default store;