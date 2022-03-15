import { useCallback, useState } from "react";

export const useField = (initialValue = null) => {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback((evt) => setValue(evt.target.value), []);

  const reset = useCallback(() => setValue(initialValue), [initialValue]);

  return [value, onChange, reset];
};
