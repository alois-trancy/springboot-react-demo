import { Badge, Empty, Table, Tag, Row } from "antd";
import { useGetStudentsQuery, Student as StudentProps } from "../api/apiSlice";
import Spinner from "../../components/Spinner";
import AddNewStudentButton from "./AddNewStudentButton";
import AddStudentForm from "./AddStudentForm";
import { useState } from "react";
import StudentAvatar from "./StudentAvatar";
import ActionButtons from "./ActionButtons";

const Students = () => {

  const {
    data: students,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetStudentsQuery();

  const [showAddStudentForm, setShowAddStudentForm] = useState<boolean>(false);

  const columns = [
    {
      dataIndex: "avatar",
      key: "avatar",
      render: (text: string, student: any) => <StudentAvatar name={student.name} />
    },
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text: string, student: any) => {
        return <ActionButtons id={student.id} />;
      },
    }
  ];

  const dataSource = students?.map((student: StudentProps) => {
    return {
      key: student.id,
      id: student.id,
      name: student.name,
      email: student.email,
      gender: student.gender,
    };
  });

  const renderStudents = (): JSX.Element => {
    if (isLoading) return <Spinner />
    // if (students?.length === 0) return <Empty />
    return <>
      <AddStudentForm showAddStudentForm={showAddStudentForm} setShowAddStudentForm={setShowAddStudentForm} />
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        title={() => {
          return <>
            <Row align="middle" style={{ marginBottom: "1rem" }}>
              <Tag>Number of Students</Tag>
              <Badge count={students?.length ?? 0} showZero
                style={
                  {
                    color: "#999",
                    backgroundColor: "#fff",
                    boxShadow: "0 0 0 1px #d9d9d9 inset",
                  }
                } />
            </Row>
            <AddNewStudentButton onClick={() => setShowAddStudentForm(true)} />
          </>;
        }}
        pagination={{ pageSize: 50 }}
        scroll={{ y: 308 }}
      />
    </>
  };

  return renderStudents();
};

export default Students;