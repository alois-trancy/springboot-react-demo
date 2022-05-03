import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from "antd";

const Spinner = () => {
  return <Spin indicator={<LoadingOutlined style={{ fontSize: "1.5rem" }} spin />} />
};

export default Spinner;