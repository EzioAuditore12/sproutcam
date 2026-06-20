import { useEffect, useRef } from "react";

// Super helpful hook to avoid memory leaks when using setTimeout.
const useTimeout = () => {
  const ref = useRef<ReturnType<typeof setTimeout> | null>(null);

  const run = (handler: (...args: any[]) => void, timeout: number) => {
    if (ref.current) clearTimeout(ref.current);
    ref.current = setTimeout(handler, timeout);
  };

  useEffect(() => {
    return () => {
      if (ref.current) clearTimeout(ref.current);
    };
  }, []);
  return run;
};

export { useTimeout };
