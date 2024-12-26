import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDeleteEscoMutation } from "../services/esco";

export default function useDeleteEsco(redirectTo = "/escos") {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const [_deleteEsco] = useDeleteEscoMutation();
  async function deleteEsco(escoId) {
    const { unwrap } = _deleteEsco(escoId);
    try {
      setIsDeleting(true);
      await unwrap();
      toast.success("Esco deleted");
      navigate(redirectTo);
    } catch (err) {
      toast.error("Esco deletion failed");
    } finally {
      setIsDeleting(false);
    }
  }

  return [deleteEsco, isDeleting];
}
