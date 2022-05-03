import { Popconfirm, Radio } from 'antd';
import { useDeleteStudentMutation } from '../api/apiSlice';
import { errorNotification, successNotification } from '../../components/Notifications';
import { getErrorMessage } from '../../app/utilities';

const DeleteConfirm = ({ id }: { id: number }) => {

  const [deleteStudent, { isLoading }] = useDeleteStudentMutation();

  const onConfirm = async (e: any) => {
    try {
      await deleteStudent(id).unwrap();
      successNotification("Student successfully deleted.", `Student with ${id} was deleted.`);
    } catch (err) {
      errorNotification("Student deletion failed.", getErrorMessage(err));
    }
  };

  const onCancel = (e: any) => { };

  return <Popconfirm
    title="Are you sure to delete this student?"
    onConfirm={onConfirm}
    onCancel={onCancel}
    okText="Yes"
    cancelText="No"
  >
    <Radio.Button value="small">Delete</Radio.Button>
  </Popconfirm>;
};

export default DeleteConfirm;