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
import MyTrip from './Pages/MyTrip/MyTrip.jsx';
import PrivateRoute from './Route/PrivateRoute.jsx';
import TripAlbum from './Pages/TripAlbum/TripAlbum.jsx';
import CurrentTripPhoto from './Pages/TripAlbum/CurrentTripPhoto/CurrentTripPhoto.jsx';
import PastTripPhoto from './Pages/TripAlbum/PastTripPhoto/PastTripPhoto.jsx';
import TripBlog from './Pages/TripBlog/TripBlog.jsx';
import TripVlog from './Pages/TripVlog/TripVlog.jsx';
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
        element:<PrivateRoute><PlanTrip/></PrivateRoute>
      },
      {
        path:"/myTrip",
        element:<PrivateRoute><MyTrip/></PrivateRoute>
      },
      {
        path:"/tripAlbum",
        element:<PrivateRoute><TripAlbum/></PrivateRoute>
      },
      {
        path:"/currentTripPhoto",
        element:<PrivateRoute><CurrentTripPhoto/></PrivateRoute>
      },
      {
        path:"/pastTripPhoto",
        element:<PrivateRoute><PastTripPhoto/></PrivateRoute>
      },
      {
        path:"/tripBlog",
        element:<PrivateRoute><TripBlog/></PrivateRoute>
      },
      {
        path:"/tripVlog",
        element:<PrivateRoute><TripVlog/></PrivateRoute>
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
