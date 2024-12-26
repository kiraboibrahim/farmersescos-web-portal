import { Link, Sheet, Typography } from "@mui/joy";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

export default function SuperAdminRequired({ children }) {
  const SUPER_ADMIN_ROLE = "SUPER_ADMIN";
  const { user } = useAuth();
  if (!user || user?.role !== SUPER_ADMIN_ROLE) {
    return <UnAuthorized />;
  }
  return <>{children}</>;
}

function UnAuthorized() {
  const location = useLocation();
  const [timeLeft, setTimeLeft] = useState(5); // seconds
  useEffect(() => {
    const timeIntervalId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearTimeout(timeIntervalId);
  });
  if (timeLeft === 0) {
    return <Navigate to="/login" state={{ next: location.pathname }} />;
  }
  return (
    <Sheet
      sx={{
        width: 1,
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "md",
      }}
      variant="soft"
      color="danger"
    >
      <Typography
        level="body-sm"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Typography>{`Unauthorized. Redirecting to login page in ${timeLeft}s`}</Typography>
        <Link component={RouterLink} to="/login" sx={{ alignSelf: "center" }}>
          <Typography level="title-md">Login now</Typography>
        </Link>
      </Typography>
    </Sheet>
  );
}
