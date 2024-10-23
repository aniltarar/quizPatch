import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { AdminRoutes } from './routes/AdminRoute';
import { AuthRoutes } from './routes/AuthRoute';
import { HomeRoutes } from './routes/HomeRoute';

const App = () => {
  const router = createBrowserRouter([
    HomeRoutes,
    AuthRoutes,
    AdminRoutes,
  ]);
  return <RouterProvider router={router} />;
};


export default App;