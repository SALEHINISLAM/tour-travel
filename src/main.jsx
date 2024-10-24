import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import App from './App.jsx'
import Home from './Pages/Home/Home.jsx';
import Contact from './Pages/Contact/Contact.jsx';
import Login from './Pages/Login/Login.jsx';
import AuthProviders from './Providers/AuthProviders.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Register from './Pages/Register/Register.jsx';
import PlanTrip from './Pages/PlanTrip/PlanTrip.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path:"/register",
        element:<Register/>
      },
      {
        path:"/planTrip",
        element:<PlanTrip/>
      }
    ]
  },
]);
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProviders>
        <RouterProvider router={router} />
      </AuthProviders>
    </QueryClientProvider>
  </StrictMode>,
)
