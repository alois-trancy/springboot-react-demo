import { notification } from "antd";
import { IconType, NotificationPlacement } from "antd/lib/notification";

const openNotificationWithIcon = (type: IconType, message: string, description: string, placement?: NotificationPlacement) => {
  placement = placement || "topRight";
  notification[type]({ message, description, placement });
};

export const successNotification = (message: string, description: string) =>
  openNotificationWithIcon("success", message, description);

export const errorNotification = (message: string, description: string) =>
  openNotificationWithIcon("error", message, description);

export const infoNotification = (message: string, description: string) =>
  openNotificationWithIcon("info", message, description);

export const warningNotification = (message: string, description: string) =>
  openNotificationWithIcon("warning", message, description);