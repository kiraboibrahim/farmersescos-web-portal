import { useState } from "react";

export function useLocalStorage(key, defaultValue = null) {
  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);

      if (item === null) return undefined;

      return JSON.parse(item);
    } catch (error) {
      window.console.log(error);
      return undefined;
    }
  };
  const cachedValue = getItem();
  const [value, setValue] = useState(
    !!cachedValue ? cachedValue : defaultValue
  );
  const setItem = (value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      setValue(value);
    } catch (error) {
      window.console.log(error);
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
      setValue(null);
    } catch (error) {
      window.console.log(error);
    }
  };

  return [value, setItem, removeItem];
}
