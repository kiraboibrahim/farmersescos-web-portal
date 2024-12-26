import { toast } from "react-toastify";
import { useUpdateEscoMutation } from "../services/esco";
import { useState } from "react";
import parseError from "../components/common/utils/parse-error";

export default function useUpdateEsco() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [_updateEsco] = useUpdateEscoMutation();
  async function updateEsco(escoId, body) {
    const { unwrap } = _updateEsco({ escoId, ...body });
    try {
      setIsUpdating(true);
      const response = await unwrap();
      toast.success("Esco updated");
      return response;
    } catch (err) {
      toast.error(`Esco update failed. Reason: ${parseError(err)}`);
    } finally {
      setIsUpdating(false);
    }
  }

  return [updateEsco, isUpdating];
}
