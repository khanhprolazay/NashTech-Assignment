/** @format */

import React from "react";
import { connect } from "react-redux";
import ListUserPageView from "./ListUserPageView";
import {
	getUsers,
	getRoles,
	editUser,
} from "../../../../app/slices/user.slice";

class ListUserPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			user: null,
			loading: false,
		};

		this.onChooseUser = this.onChooseUser.bind(this);
		this.triggerForm = this.triggerForm.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		this.props.dispatch(getUsers());
		this.props.dispatch(getRoles());
	}

	onSubmit = (data) => {
		this.props.dispatch(editUser(data));
	};

	triggerForm() {
		this.setState((state) => ({ open: !state.open }));
	}

	onChooseUser(user) {
		this.setState({ user });
		this.triggerForm();
	}

	render() {
		return ListUserPageView.call(this);
	}
}

function mapStateToProps(state) {
	const { users, roles, loading } = state.user;
	return { users, roles, loading };
}

export default connect(mapStateToProps)(ListUserPage);
