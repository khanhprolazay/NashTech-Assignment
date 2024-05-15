/** @format */

import {
	Layout,
	Switch,
	Typography,
	Avatar,
	Dropdown,
	Input,
	Image,
	Divider,
} from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { useState, useLayoutEffect } from "react";
import { setDarkMode } from "../app/slices/app.slice";
import { useDispatch, useSelector } from "react-redux";
const { Header } = Layout;
import { auth0Client } from "../Auth0Client";

const getTimeString = () => {
	const date = new Date();
	return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

const items = [
	{
		key: "avatar-menu-item-2",
		label: <a onClick={() => auth0Client.logout()}>Sign out</a>,
	},
];

const Time = () => {
	const [time, setTime] = useState(getTimeString());

	useLayoutEffect(() => {
		const interval = setInterval(() => setTime(getTimeString()), 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<Typography className="text-sm">
			<strong>Time: </strong>
			{time}
		</Typography>
	);
};

const AppHeader = () => {
	const dispatch = useDispatch();
	const { information } = useSelector((state) => state.user);
	const { darkMode } = useSelector((state) => state.app);
	const toggleDarkMode = () => dispatch(setDarkMode(!darkMode));

	return (
		<Header className="h-16 px-0 border-b box-border border-b-slate-200 dark:!border-b-zinc-900 flex">
			<div className="pl-6 flex min-w-[200px] items-center">
				<Image
					preview={false}
					height={32}
					src="https://ph-files.imgix.net/245e6401-8144-4663-b12a-a11446a39958.png?auto=format"
					className="transition-all ease-linear relative cursor-pointer"
				/>
				<Typography.Title level={2} className="!mb-0 ml-2">
					Auth0
				</Typography.Title>
			</div>
			<div className="flex justify-between w-full p-6">
				<div className="flex items-center w-[448px] mr-6">
					<Input.Search
						allowClear
						variant="filled"
						size="large"
						placeholder="Find function"
					/>
				</div>
				<div className="flex gap-4 items-center">
					<div className="flex items-center gap-2">
						<Typography className="text-sm">
							<strong>Dark mode: </strong>
						</Typography>
						<Switch
							rootClassName="bg-slate-400"
							unCheckedChildren={<SunOutlined />}
							checkedChildren={<MoonOutlined />}
							checked={darkMode}
							onChange={toggleDarkMode}
						/>
					</div>

					<Divider type="vertical" />
					<Time />
					<Divider type="vertical" />
					<Dropdown menu={{ items }} placement="bottom">
						<Avatar
							src={
								information?.picture ||
								"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeucaYuKTo6E1hB5JbXo44etbnn2lMsTM6Cms3wOogeg&ss"
							}
						/>
					</Dropdown>
				</div>
			</div>
		</Header>
	);
};

export default AppHeader;
