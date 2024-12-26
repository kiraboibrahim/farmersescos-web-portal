import { toast } from "react-toastify";
import { useCreateFarmerMutation } from "../services/farmer";
import { useState } from "react";
import parseError from "../components/common/utils/parse-error";

export default function useCreateFarmer() {
  const [isCreating, setIsCreating] = useState(false);
  const [_createFarmer] = useCreateFarmerMutation();
  async function createFarmer(body) {
    const { unwrap } = _createFarmer(body);
    try {
      setIsCreating(true);
      const data = await unwrap();
      toast.success("Farmer created");
      return data;
    } catch (err) {
      toast.error(`Farmer creation failed. Reason: ${parseError(err)}`);
    } finally {
      setIsCreating(false);
    }
  }

  return [createFarmer, isCreating];
}
