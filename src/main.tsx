import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from '@/pages/login/Login';
import SignUp from '@/pages/signup/SignUp';
import { Toaster } from "@/components/ui/sonner";
import { RoutePath } from './routes';
import Home from '@/pages/Home/Home';

const router = createBrowserRouter([
  {
    path: RoutePath.LOGIN,
    Component: Login,
  },
  {
    path: RoutePath.SIGNUP,
    Component: SignUp,
  },
  {
    path: RoutePath.HOME,
    Component: Home,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster position="top-center" richColors />
  </StrictMode>,
)
