/** @format */

import { Row, Col, Table, Card, Button, Flex, Modal } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import EditUserForm from "./components/EditUserForm";

export default function () {
	const columns = [
		{
			title: "Name",
			dataIndex: "name",
		},
		{
			title: "Email",
			dataIndex: "email",
		},
		{
			title: "Role",
			render: (_, record) => record.role.name,
		},
		{
			dataIndex: "action",
			render: (_, record) => (
				<Flex gap={8} justify="space-around">
					<Button
						type="primary"
						icon={<SettingOutlined />}
						onClick={() => this.onChooseUser(record)}
					/>
				</Flex>
			),
		},
	];

	return (
		<>
			<Row justify="space-around">
				<Col lg={16}>
					<Card title="Manage user">
						<Table
							columns={columns}
							loading={this.props.loading}
							dataSource={this.props.users} />
					</Card>
				</Col>
			</Row>
			<Modal
				title="Edit user"
				footer={null}
				open={this.state.open}
				onCancel={this.triggerForm}>
				<EditUserForm
					user={this.state.user}
					roles={this.props.roles}
					onSubmit={this.onSubmit}
					loading={this.props.loading}
				/>
			</Modal>
		</>
	);
}
