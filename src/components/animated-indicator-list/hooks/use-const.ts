import { useState } from "react";

function useConst<T>(initialValue: T | (() => T)): T {
  const [value] = useState(initialValue);
  return value;
}

export { useConst };
