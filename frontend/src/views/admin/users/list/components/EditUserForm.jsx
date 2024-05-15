/** @format */

import { Button, Form, Input, Select } from "antd";

export default function EditUserForm({ user, roles, onSubmit, loading }) {
	return (
		<Form
			labelCol={{ span: 4 }}
			wrapperCol={{ span: 20 }}
			onFinish={onSubmit}
			initialValues={{ ...user, roleId: user.role.id }}>
			<Form.Item label="ID" name="id" required hidden>
				<Input readOnly />
			</Form.Item>
			<Form.Item label="Email" name="email" required>
				<Input readOnly />
			</Form.Item>
			<Form.Item label="Name" name="name" required>
				<Input />
			</Form.Item>
			<Form.Item label="Role" name="roleId" required>
				{roles && (
					<Select>
						{roles.map((role) => (
							<Select.Option key={role.id} value={role.id}>
								{role.name}
							</Select.Option>
						))}
					</Select>
				)}
			</Form.Item>
			<Form.Item>
				<Button loading={loading} type="submit" htmlType="submit">
					Save
				</Button>
			</Form.Item>
		</Form>
	);
}
