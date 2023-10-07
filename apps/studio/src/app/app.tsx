import { Header } from './components/Header';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import { HomePage } from './pages/Home';
import { RecordPage } from './pages/Record';
import { SettingsProvider } from './context/settings.context';
import { ConfigProvider, theme } from 'antd';

const router = createBrowserRouter([
  {
    element: (
      <>
        <Header />
        <main className="flex flex-col items-center justify-center pt-16">
          <Outlet />
        </main>
      </>
    ),
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/record', element: <RecordPage /> },
    ],
  },
]);

export function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#fc0ef5',
        },
      }}
    >
      <SettingsProvider>
        <RouterProvider router={router} />
      </SettingsProvider>
    </ConfigProvider>
  );
}

export default App;
