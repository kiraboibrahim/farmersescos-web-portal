import { toast } from "react-toastify";
import { useUpdateFarmerMutation } from "../services/farmer";
import { useState } from "react";
import parseError from "../components/common/utils/parse-error";

export default function useUpdateFarmer() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [_updateFarmer] = useUpdateFarmerMutation();
  async function updateFarmer(farmerId, body) {
    const { unwrap } = _updateFarmer({ farmerId, ...body });
    try {
      setIsUpdating(true);
      const data = await unwrap();
      toast.success("Farmer updated");
      return data;
    } catch (err) {
      toast.error(`Farmer update failed. Reason: ${parseError(err)}`);
    } finally {
      setIsUpdating(false);
    }
  }

  return [updateFarmer, isUpdating];
}
