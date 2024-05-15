import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
const { Content } = Layout;

const AppLayout = () => {

  return (
    <Layout className="max-h-screen overflow-hidden">
      <AppHeader />
      <Layout className="flex">
        <AppSidebar />
        <Content className="p-6 overflow-auto min-h-[calc(100vh-64px)] max-h-[calc(100vh-64px)]">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
