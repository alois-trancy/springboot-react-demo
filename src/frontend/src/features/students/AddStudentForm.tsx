import { Drawer, Form, Button, Col, Row, Input, Select } from "antd";
import React from "react";
import { useAddNewStudentMutation } from "../api/apiSlice";
import { successNotification, errorNotification } from "../../components/Notifications";
import { getErrorMessage } from "../../app/utilities";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";

interface AddStudentProps {
  showAddStudentForm: boolean,
  setShowAddStudentForm: React.Dispatch<React.SetStateAction<boolean>>,
}

const { Option } = Select;

const AddStudentForm = ({ showAddStudentForm, setShowAddStudentForm }: AddStudentProps) => {
  const [addStudent, { isLoading }] = useAddNewStudentMutation();

  const onClose = () => setShowAddStudentForm(false);

  const onFinish = async (values: any) => {
    try {
      const student = values;
      await addStudent(student).unwrap();
      successNotification("Student successfully added.", `${student.name} was added to the system.`);
      onClose();
    } catch (err) {
      errorNotification("Failed to save student.", getErrorMessage(err));
    }
  };

  return <Drawer
    title="Create new student"
    width={720}
    onClose={onClose}
    visible={showAddStudentForm}
    bodyStyle={{ paddingBottom: 80 }}
    footer={
      <div
        style={{
          textAlign: "right",
        }}
      >
        <Button onClick={onClose} style={{ marginRight: 8 }}>
          Cancel
        </Button>
      </div>
    }
  >
    <Form layout="vertical"
      onFinish={onFinish}
      hideRequiredMark>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter student name" }]}
          >
            <Input placeholder="Please enter student name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter student email" }]}
          >
            <Input placeholder="Please enter student email" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please select a gender" }]}
          >
            <Select placeholder="Please select a gender">
              <Option value="MALE">MALE</Option>
              <Option value="FEMALE">FEMALE</Option>
              <Option value="OTHER">OTHER</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  </Drawer>;
};

export default AddStudentForm;