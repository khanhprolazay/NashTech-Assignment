/** @format */

import { notification as notificationApi } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function NotificationProvider({ children }) {
	const { notification } = useSelector((state) => state.app);
	const [api, contextHolder] = notificationApi.useNotification();

	useEffect(() => {
		if (notification) {
			api[notification.type]({
				message: notification.title,
				description: notification.message,
			});
		}
	}, [notification]);

	return (
		<>
			{contextHolder}
			{children}
		</>
	);
}
