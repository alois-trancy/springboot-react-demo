import { Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';

const StudentAvatar = ({ name }: { name: string }) => {
  if (name.trim().length === 0) return <Avatar icon={<UserOutlined />} />;

  const nameSplit: Array<string> = name.trim().split(" ");

  if (nameSplit.length === 1) return <Avatar>{nameSplit[0].charAt(0)}</Avatar>;

  return <Avatar>{nameSplit[0].charAt(0) + nameSplit[1].charAt(0)}</Avatar>;
};

export default StudentAvatar;