import { Radio, Button } from "antd";
import DeleteConfirm from "./DeleteConfirm";

const ActionButtons = ({ id }: { id: number }) => {
  return <Radio.Group>
    <DeleteConfirm id={id} />
    <Radio.Button value="small">Edit</Radio.Button>
  </Radio.Group>;
};

export default ActionButtons;