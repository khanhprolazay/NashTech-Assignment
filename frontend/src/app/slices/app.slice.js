/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	darkMode: localStorage.getItem("darkMode") === "true",
	time: Date.now(),
	notification: null,
};

if (initialState.darkMode) {
	document.documentElement.classList.add("dark");
}

const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		setDarkMode: (state, action) => {
			state.darkMode = action.payload;
			localStorage.setItem("darkMode", action.payload);

			if (action.payload) {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
		},

		toggleTime: (state, _) => {
			state.time = Date.now();
		},

		setNotification: (state, action) => {
			state.notification = action.payload;
		},
	},
});

export const { setNotification, setDarkMode, toggleTime } = appSlice.actions;
export default appSlice.reducer;
