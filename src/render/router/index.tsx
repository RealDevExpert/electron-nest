import App from '@render/App';
import Demo from '@render/pages/Demo';
import type { ReactNode } from 'react';
import { Suspense } from 'react';
import { createHashRouter } from 'react-router-dom';

function lazyLoad(children: ReactNode): ReactNode {
  return <Suspense>{children}</Suspense>;
}

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: lazyLoad(<Demo />),
      },
    ],
  },
]);

export default router;
