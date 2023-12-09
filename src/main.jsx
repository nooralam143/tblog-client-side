import React from 'react';
import ReactDOM from 'react-dom/client'; // Changed import statement

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import AuthProvider from './providers/AuthProvider';
import Home from './Home/Home';
import ErrorPage from './ErrorPage/ErrorPage';
import Root from './Root/Root';
import SignIn from './Users/SignIn';
import SignUp from './Users/SignUp';
import AddBlog from './Pages/AddBlog';
import AllBlog from './Pages/AllBlog';
import FeaturedBlogs from './Pages/FeaturedBlogs';
import Wishlist from './Pages/Wishlist';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import UpdateBlog from './Pages/UpdateBlog';
import BlogDetails from './Pages/BlogDetails';
import { serverURL } from './config';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/login',
        element:<SignIn></SignIn>,
      },
      {
        path: '/register',
        element:<SignUp></SignUp>,
      }
      ,
      {
        path: '/add-blog',
        element:<PrivateRoute><AddBlog></AddBlog></PrivateRoute>,
      }
      ,
      {
        path: '/all-blog',
        element:<AllBlog></AllBlog>,
      },
      {
        path: '/post/:id',
        element:<PrivateRoute><BlogDetails></BlogDetails></PrivateRoute>,
      }
      ,
      {
        path: '/update/:id',
        element:<PrivateRoute><UpdateBlog></UpdateBlog></PrivateRoute>,
        loader: ({params}) => fetch(`${serverURL}/post/${params.id}`)
      }
      ,
      {
        path: '/featured-blogs',
        element:<FeaturedBlogs></FeaturedBlogs>,
      }
      ,
      {
        path: '/wishlist',
        element:<PrivateRoute><Wishlist></Wishlist></PrivateRoute>,
      }
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
