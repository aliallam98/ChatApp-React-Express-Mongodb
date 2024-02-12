import App from "@/App";
import AuthMiddleware from "@/components/AuthMiddleware";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  
  {
    path: "/",
    element:   <AuthMiddleware><App /></AuthMiddleware> ,
    children: [
      {
        path: "/",
        element:<Home /> 
      },
      {
        path: "/login",
        element: <Login />  ,
      },
      {
        path: "/signup",
        element: <SignUp   /> ,
      },
    ],
  },
]);

export default router;
