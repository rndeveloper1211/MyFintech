// Redux Toolkit se createSlice import kar rahe hain
// createSlice = state + reducer + actions ek saath banata hai
import { createSlice } from "@reduxjs/toolkit";


// UserSlice create ho raha hai
// Ye slice user se related saara redux data handle karega
const UserSlice = createSlice({

    // 🔹 Slice ka unique name
    // Redux DevTools me "user" naam se dikhega
    name: 'user',

    // 🔹 Initial State
    // Jab app start hogi tab ye default data hoga
    initialState: {

        // User ka naam (default)
        name: 'User',

        // User ka email
        email: '',

        // Profile image ka URL
        image: '',

        // User ka phone number
        phone: '',

        // User login hai ya nahi
        // false = logged out
        // true = logged in
        isLogin: false,

        // Backend se aane wali user ki ID
        userId: '',
    },

    // 🔹 Reducers
    // Reducers wo functions hote hain jo state ko update karte hain
    reducers: {

        // 🟢 setUserInfo
        // Sirf user ki basic information update karega
        setUserInfo: (state, action) => {

            // action.payload me wo data aata hai
            // jo dispatch ke time bheja gaya hota hai

            state.name = action.payload.name;   // name update
            state.email = action.payload.email; // email update
            state.image = action.payload.image; // profile image update
            state.phone = action.payload.phone; // phone update
        },

        // 🟢 setLoginStatus
        // Sirf login / logout status set karega
        setLoginStatus: (state, action) => {

            // payload me true ya false aayega
            state.isLogin = action.payload;
        },

        // 🟢 setUserId
        // Sirf userId set karega
        setUserId: (state, action) => {

            // payload = userId string
            state.userId = action.payload;
        },

        // 🔴 logoutUser
        // Logout ke time saara user data clear karega
        logoutUser: (state) => {

            // Sab fields ko default value pe reset kar diya
            state.name = 'User';
            state.email = '';
            state.image = '';
            state.phone = '';
            state.isLogin = false;
            state.userId = '';
        }
    }
});


// 🔹 Actions export
// Taaki component me dispatch() ke saath use kar saken
export const {
    setUserInfo,
    setLoginStatus,
    setUserId,
    logoutUser
} = UserSlice.actions;


// 🔹 Reducer export
// Ye reducer store me add hota hai
export default UserSlice.reducer;
