import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// note: maybe have a UI button for clearing the local storage data

type WindowProps = {
  window: (Window & typeof globalThis) | undefined;
  hasWindow: boolean;
};
const WindowContext = createContext<WindowProps>({
  window: typeof window !== "undefined" ? window : undefined,
  hasWindow: false,
});
export const WindowProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [hasWindow, setHasWindow] = useState(false);

  useEffect(() => {
    setHasWindow(typeof window !== "undefined");
  }, [typeof window]);

  const value = useMemo(
    () => ({
      window: typeof window !== "undefined" ? window : undefined,
      hasWindow,
    }),
    [hasWindow, typeof window]
  );

  return (
    <WindowContext.Provider value={value}>{children}</WindowContext.Provider>
  );
};

// hook for ensuring localStorage is fetchable
export const useLocalStorage = () => {
  const { window } = useContext(WindowContext);
  return window?.localStorage ?? ({} as Storage);
};
