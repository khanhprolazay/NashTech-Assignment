/** @format */

import { auth0Client } from "../Auth0Client";
import { apolloClient } from "../ApolloClient";
import { gql } from "@apollo/client";

export const fetchInformation = () => auth0Client.getUser();
export const fetchUsers = () =>
	apolloClient
		.query({
			query: gql`
				{
					users {
						id
						email
						name
						role {
							id
							name
						}
					}
				}
			`,
		})
		.then((result) => result.data.users);

export const fetchRoles = () =>
	apolloClient
		.query({
			query: gql`
				{
					roles {
						id
						name
					}
				}
			`,
		})
		.then((result) => result.data.roles);

export const callEditUser = (options) => {
	delete options.email;
	return apolloClient
		.mutate({
			mutation: gql`
				mutation editUser($editUserDto: EditUserDto!) {
					editUser(editUserDto: $editUserDto) {
						id
						name
						email
						role {
							id
							name
						}
					}
				}
			`,
			variables: { editUserDto: options },
		})
		.then((result) => result.data.editUser);
};
