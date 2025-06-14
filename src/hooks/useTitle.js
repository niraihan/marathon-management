import { useEffect, useCallback } from "react";

// Dual-mode useTitle hook
const useTitle = (initialTitle) => {
  // Mode 1: Immediate title set if initialTitle is provided
  useEffect(() => {
    if (initialTitle) {
      document.title = initialTitle;
    }
  }, [initialTitle]);

  // Mode 2: Return a function to set title dynamically
  const setTitle = useCallback((newTitle) => {
    document.title = newTitle;
  }, []);

  return setTitle;
};

export default useTitle;
