import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../hooks/useAuth";

export default function SuperAdminRequired({ children }) {
  const location = useLocation();
  const SUPER_ADMIN_ROLE = "SUPER_ADMIN";
  const { user } = useAuth();
  if (!user || user?.role !== SUPER_ADMIN_ROLE) {
    return <Navigate to="/login" state={{ next: location.pathname }} />;
  }
  return <>{children}</>;
}
