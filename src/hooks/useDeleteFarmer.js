import { toast } from "react-toastify";
import { useDeleteFarmerMutation } from "../services/farmer";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function useDeleteFarmer(redirectTo = "/farmers") {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const [_deleteFarmer] = useDeleteFarmerMutation();
  async function deleteFarmer(farmerId) {
    const { unwrap } = _deleteFarmer(farmerId);
    try {
      setIsDeleting(true);
      await unwrap();
      toast.success("Farmer deleted");
      navigate(redirectTo);
    } catch (err) {
      toast.error("Farmer deletion failed");
    } finally {
      setIsDeleting(false);
    }
  }

  return [deleteFarmer, isDeleting];
}
