import {
	FunctionOutlined
} from "@ant-design/icons";
import { Menu, Layout } from "antd";
import { Fragment, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const items = [
	{ route: "/", label: "Dashboard", icon: <FunctionOutlined /> },
];

const AppSidebar = () => {
	const location = useLocation();
	const [collapsed, setCollapsed] = useState(false);
	const toggleCollapsed = () => setCollapsed(prev => !prev);

	return (
		<Layout.Sider
			collapsible
			theme="light"
			collapsed={collapsed}
			onCollapse={toggleCollapsed}
			className="!overflow-auto border-r box-border border-r-slate-200 dark:border-r-zinc-900 fix top-0 left-0 z-20 no-scroll-bar">
			<Menu
				className="text-sm font-normal"
				mode="inline"
				theme="light"
				selectedKeys={[location.pathname]}>
				{items.map((item) => (
					<Menu.Item key={item.route}>
						<Link to={item.route}>
							<Fragment>
								{item.icon}
								<span>{item.label}</span>
							</Fragment>
						</Link>
					</Menu.Item>
				))}
			</Menu>
		</Layout.Sider>
	);
};

export default AppSidebar;
