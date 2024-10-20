import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../slices/auth";

export const useAuth = () => {
  const user = useSelector(selectCurrentUser);

  return useMemo(() => ({ user }), [user]);
};
