import { toast } from "react-toastify";
import { useUpdateProductMutation } from "../services/product";
import { useState } from "react";
import parseError from "../components/common/utils/parse-error";

export default function useUpdateProduct() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [_updateProduct] = useUpdateProductMutation();
  async function updateProduct(productId, body) {
    const bodyCopy = structuredClone(body);
    const { categories } = bodyCopy;
    // Format the categories in the structure expected by the API
    if (!!categories?.length) {
      bodyCopy["categoriesIds"] = categories.map((category) => category.id);
      delete bodyCopy["categories"];
    }
    const { unwrap } = _updateProduct({ productId, ...bodyCopy });
    try {
      setIsUpdating(true);
      const data = await unwrap();
      toast.success("Product updated");
      return data;
    } catch (err) {
      toast.error(`Product update failed. Reason: ${parseError(err)}`);
    } finally {
      setIsUpdating(false);
    }
  }

  return [updateProduct, isUpdating];
}
