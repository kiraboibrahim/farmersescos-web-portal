import { toast } from "react-toastify";
import { useCreateEscoMutation } from "../services/esco";
import { useState } from "react";
import parseError from "../components/common/utils/parse-error";

export default function useCreateEsco() {
  const [isCreating, setIsCreating] = useState(false);
  const [_createEsco] = useCreateEscoMutation();
  async function createEsco(body) {
    const { unwrap } = _createEsco(body);
    try {
      setIsCreating(true);
      const data = await unwrap();
      toast.success("Esco created");
      return data;
    } catch (err) {
      toast.error(`Esco creation failed. Reason: ${parseError(err)}`);
    } finally {
      setIsCreating(false);
    }
  }

  return [createEsco, isCreating];
}
