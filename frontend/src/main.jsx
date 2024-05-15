/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { auth0Client } from "./Auth0Client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import AntdProvider from "./components/AntdProvider.jsx";
import WhoamiProvider from "./components/WhoamiProvider.jsx";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./ApolloClient";
import NotificationProvider from "./components/NotificationProvider.jsx";

await auth0Client.init();

function AppProvider({ children }) {
	return (
		<Provider store={store}>
			<ApolloProvider client={apolloClient}>
				<WhoamiProvider>
					<AntdProvider>
						<NotificationProvider>{children}</NotificationProvider>
					</AntdProvider>
				</WhoamiProvider>
			</ApolloProvider>
		</Provider>
	);
}

ReactDOM.createRoot(document.getElementById("root")).render(
	<AppProvider>
		<App />
	</AppProvider>
);
