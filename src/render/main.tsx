import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { AnimatePresence } from 'framer-motion';
import { RouterProvider } from 'react-router-dom';
import router from './router';

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <StyleProvider hashPriority="high">
      <ConfigProvider
        theme={{
          algorithm: [theme.darkAlgorithm],
          token: {
            borderRadius: 0,
          },
          components: {
            Layout: {
              siderBg: '#272930',
              headerBg: '#272930',
              footerBg: '#292B33',
              headerPadding: '0 12px',
            },
          },
        }}
        locale={zhCN}
      >
        <AnimatePresence>
          <RouterProvider
            router={router}
            future={{
              v7_startTransition: true,
            }}
          />
        </AnimatePresence>
      </ConfigProvider>
    </StyleProvider>
  </React.StrictMode>,
);
