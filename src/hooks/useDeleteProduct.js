import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDeleteProductMutation } from "../services/product";

export default function useDeleteProduct(redirectTo = "/products") {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const [_deleteProduct] = useDeleteProductMutation();
  async function deleteProduct(escoId) {
    const { unwrap } = _deleteProduct(escoId);
    try {
      setIsDeleting(true);
      await unwrap();
      toast.success("Product deleted");
      navigate(redirectTo);
    } catch (err) {
      toast.error("Product deletion failed");
    } finally {
      setIsDeleting(false);
    }
  }

  return [deleteProduct, isDeleting];
}
