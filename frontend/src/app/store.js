import { configureStore } from "@reduxjs/toolkit";
import app from "./slices/app.slice";
import user from "./slices/user.slice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/root.saga";

const sagaMiddileware = createSagaMiddleware();

export const store = configureStore({
	reducer: { app, user },
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(sagaMiddileware),
});

sagaMiddileware.run(rootSaga);