import React from "react"
import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"
import Home from "./pages/home/Home"
import Gigs from "./pages/gigs/Gigs"
import Gig from "./pages/gig/Gig"
import Orders from "./pages/orders/Orders"
import MyGigs from "./pages/myGigs/MyGigs"
import Messages from "./pages/messages/Messages"
import Message from "./pages/message/Message"
import Add from "./pages/add/Add"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Pay from "./pages/pay/Pay"
import Success from "./pages/success/Success"
import Profile from "./pages/profile/Profile"
import OrderInfo from "./pages/orderInfo/OrderInfo"
import Admin from "./pages/admin/Admin"
import NotFound from "./components/notFound/NotFound"
import AdminOrders from "./pages/adminOrders/AdminOrders"
import About from "./pages/about/About"
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import "./App.scss"

function App() {

  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/gigs",
          element: <Gigs />
        },
        {
          path: "/gig/:id",
          element: <Gig />
        },
        {
          path: "/orders",
          element: <Orders />
        },
        {
          path: "/mygigs",
          element: <MyGigs />
        },
        {
          path: "/add",
          element: <Add />
        },
        {
          path: "/messages",
          element: <Messages />
        },
        {
          path: "/message/:id",
          element: <Message />
        },
        {
          path: "/messages",
          element: <Messages />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/pay/:id",
          element: <Pay />
        },
        {
          path: "/success",
          element: <Success />
        },
        {
          path: "/users/profile/:id",
          element: <Profile />
        },
        {
          path: "/orders/:id/info",
          element: <OrderInfo />
        },
        {
          path: "/admin",
          element: <Admin />
        },
        {
          path: "/admin/orders",
          element: <AdminOrders />
        },
        {
          path: "/about",
          element: <About />
        },
        // {
        //   path: "*",
        //   element: <NotFound />
        // }
      ]
    },
    {
      path: "*",
      element: <NotFound />
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App