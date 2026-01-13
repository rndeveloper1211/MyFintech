import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
const theme = {
    dark: {
        dark: {
            background: "#0F172A",
            text: "#E5E7EB",
            primary: "#38BDF8",
            card: "#1E293B",
        },
    },
    light: {
        background: "#FFFFFF",
        text: "#111827",
        primary: "#4F46E5",
        card: "#F3F4F6",
    },
    royal: {
        background: "#0B0F19",
        text: "#F8FAFC",
        primary: "#FACC15",
        card: "#1C1F2A",
    }
}


const ThemeSlice = createSlice({

    name: 'theme',
    initialState: {
        currentTheme: "light",
        colors: themes.light,

    },
    reducers: {
        setTheme: (state, action) => {
            state.currentTheme = action.payload;
            state.colors = theme[action.payload];
        }
    }
});
export const { setTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer;