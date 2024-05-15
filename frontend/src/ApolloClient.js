/** @format */

import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BACKEND_URL } from "./config";
import { jwtDecode } from "jwt-decode";
import { auth0Client } from "./Auth0Client";

const httpLink = createHttpLink({
  uri: `${BACKEND_URL}/graphql`,
})

const authLink = setContext(async (_, { headers }) => {
	let token = localStorage.getItem("token");
	const decode = jwtDecode(token);

	if (decode.exp * 1000 < Date.now() - 10) {
		token = await auth0Client.getTokenSilently();
		localStorage.setItem("token", token);
	}

	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

export const apolloClient = new ApolloClient({
	cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

