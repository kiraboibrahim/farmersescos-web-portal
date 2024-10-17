import { useEffect, useState } from "react";

export default function useDebouncedInput({
  delay = 300,
  defaultValue = null,
}) {
  const [value, setValue] = useState(defaultValue);
  const [debouncedValue, setDebouncedValue] = useState(defaultValue);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [value, delay]);
  return [debouncedValue, value, setValue];
}
