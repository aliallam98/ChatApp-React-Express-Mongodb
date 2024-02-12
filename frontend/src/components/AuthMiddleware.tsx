import { useAuthContext } from "@/context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const AuthMiddleware = ({ children }: { children: React.ReactNode }) => {
  const { authUser } = useAuthContext();
  const { pathname } = useLocation();
  const allowedPublicRoutes = ["/login", "/signup"];

  if (authUser && allowedPublicRoutes.includes(pathname)) {
    return <Navigate to="/" replace />;
  }
  if (!authUser && !allowedPublicRoutes.includes(pathname)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthMiddleware;
