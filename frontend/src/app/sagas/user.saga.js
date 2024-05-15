/** @format */

import { call, put, takeLatest } from "redux-saga/effects";
import {
	fetchInformation,
	fetchUsers,
	fetchRoles,
	callEditUser,
} from "../../services/user.service";

import {
	setInformation,
	getInformation,
	getUsers,
	setUsers,
	getRoles,
	setRoles,
	editUser,
	editUserSuccess,
	setLoading,
} from "../slices/user.slice";

import { setNotification } from "../slices/app.slice";

export function* userSaga() {
	yield takeLatest(getInformation.toString(), getUser);
	yield takeLatest(getUsers.toString(), getUsersSaga);
	yield takeLatest(getRoles.toString(), getRolesSaga);
	yield takeLatest(editUser.toString(), editUserSaga);
}

function* getUser() {
	const information = yield call(fetchInformation);
	yield put(setInformation(information));
}

function* getUsersSaga() {
	const users = yield call(fetchUsers);
	yield put(setUsers(users));
}

function* getRolesSaga() {
	const roles = yield call(fetchRoles);
	yield put(setRoles(roles));
}

function* editUserSaga(action) {
	try {
		yield put(setLoading(true));
		const user = yield call(callEditUser, action.payload);
		yield put(editUserSuccess(user));
		yield put(setLoading(false));
		yield put(
			setNotification({
				type: "success",
				title: "Success",
				message: "User edited",
			})
		);
	} catch (error) {
		yield put(setLoading(false));
		yield put(
			setNotification({ type: "error", title: "Error", message: error.message })
		);
	}
}
