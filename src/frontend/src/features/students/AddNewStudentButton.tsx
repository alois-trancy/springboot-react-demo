import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';

interface AddNewStudentButtonProps {
  onClick: CallableFunction,
}

const AddNewStudentButton = ({ onClick }: AddNewStudentButtonProps) => {
  return <Button
    type="primary"
    icon={<DownloadOutlined />}
    shape="round"
    size="middle"
    onClick={() => onClick()}
  >
    Add New Student
  </Button>
}

export default AddNewStudentButton;