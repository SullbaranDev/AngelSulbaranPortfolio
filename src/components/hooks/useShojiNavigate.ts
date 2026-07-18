import { createContext, useContext } from "react";

// Exportamos únicamente el contexto y el hook aquí (no hay componentes de React)
export const NavigationContext = createContext<(to: string) => void>(() => {});

export const useShojiNavigate = () => useContext(NavigationContext);