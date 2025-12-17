import { createContext, useState } from "react";
import type { ReactNode } from "react";

interface HomeTabsContextType {
  currentScreen: SidebarItemType | null;
  setCurrentScreen: (tab: SidebarItemType | null) => void;
}

export const HomeTabsContext = createContext<HomeTabsContextType | null>(null);

interface Props {
  children: ReactNode;
}

export const HomeTabsProvider = ({ children }: Props) => {
  const [currentScreen, setCurrentScreen] = useState<SidebarItemType | null>("explorer");

  return (
    <HomeTabsContext.Provider value={{ currentScreen, setCurrentScreen }}>
      {children}
    </HomeTabsContext.Provider>
  );
};
