import { Header } from './components/Header';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import { HomePage } from './pages/Home';
import { RecordPage } from './pages/Record';

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
  return <RouterProvider router={router} />;
}

export default App;
