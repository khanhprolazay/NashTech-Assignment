/** @format */

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		information: null,
		users: [],
		roles: [],
		loading: false
	},
	reducers: {
		getInformation: (_state, _action) => {},
		setInformation: (state, action) => {
			state.information = action.payload;
		},

		getUsers: (_state, _action) => {},
		setUsers: (state, action) => {
			state.users = action.payload;
		},

		getRoles: (_state, _action) => {},
		setRoles: (state, action) => {
			state.roles = action.payload;
		},

		editUser: (_state, _action) => {},
		editUserSuccess: (state, action) => {
			const user = action.payload;
			const index = state.users.findIndex((u) => u.id === user.id);
			state.users[index] = user;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},	
	},
});

export const {
	getUsers,
	setUsers,
	setInformation,
	getInformation,
	getRoles,
	setRoles,
	editUser,
	setLoading,
	editUserSuccess,
} = userSlice.actions;
export default userSlice.reducer;
