import { Layout, Tooltip } from 'antd';
import classNames from 'classnames';
import Plotly from 'plotly.js-dist-min';
import locale from 'plotly.js-locales/zh-CN';
import { useMemo } from 'react';
import { IoPlay } from 'react-icons/io5';
import { Link, Outlet, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

Plotly.register(locale);

function App() {
  const location = useLocation();

  const isMain = location.pathname === '/';

  const pageTitle = useMemo(() => {
    switch (location.pathname) {
      case '/':
        return '控制';
      default:
        return '导热系数系统控制';
    }
  }, [location.pathname]);

  return (
    <Layout className="w-screen h-screen">
      <Sider width={64} className="flex flex-col items-center drag">
        <div className="flex flex-col gap-8 mt-20 select-none no-drag">
          <Tooltip placement="right" title="控制">
            <Link to="/" draggable={false} className={classNames('p-2', { 'sidebar-active': isMain })}>
              <IoPlay
                size={32}
                className={classNames('text-[#83929B] hover:text-white', {
                  'text-white': isMain,
                })}
              />
            </Link>
          </Tooltip>
        </div>
      </Sider>
      <Layout>
        <Header className="text-2xl font-semibold drag">{pageTitle}</Header>
        <Content className="bg-[#212328] p-2 select-none">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
