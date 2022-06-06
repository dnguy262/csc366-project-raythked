import React, { createContext, useEffect, useMemo, useState } from "react";

// note: maybe have a UI button for clearing the local storage data

type WindowProps = {
    hasWindow: boolean;
}
const WindowContext = createContext<WindowProps>({} as any);
export const WindowProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [hasWindow, setHasWindow] = useState(false);

    useEffect(() => {
        setHasWindow(typeof window !== 'undefined');
    }, [typeof window]);

    const value = useMemo(() => ({
        hasWindow
    }), [hasWindow, typeof window]);

    return <WindowContext.Provider value={value}>{children}</WindowContext.Provider>
}

// hook for ensuring localStorage is fetchable 
export const useLocalStorage = () => {
    return window?.localStorage ?? ({} as WindowLocalStorage);
}