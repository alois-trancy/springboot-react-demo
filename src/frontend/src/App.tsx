import { Layout } from "antd";
import Students from "./features/students/Students";

const { Header, Footer, Sider, Content } = Layout;

const App = () => {
  return <>
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>Sider</Sider>
      <Layout>
        <Header>Header</Header>
        <Content style={{ padding: "1.5rem", minHeight: 360 }}><Students /></Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  </>;
};

export default App;