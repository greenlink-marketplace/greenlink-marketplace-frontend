import type { JSX } from "react";
import { BasketIcon, BookmarksSimpleIcon, TicketIcon, RecycleIcon, MapPinIcon } from "@phosphor-icons/react";
import type { NavigateFunction } from "react-router-dom";

interface SidebarItemProps {
  typeButton: SidebarItemType;
  focused: boolean;
  navigate: NavigateFunction
}

function getIcon(typeButton: SidebarItemType, className: string): JSX.Element {
  switch (typeButton) {
    case "explorer":
      return <BasketIcon className={className} />
    case "saved-items":
      return <BookmarksSimpleIcon className={className} />
    case "coupons":
      return <TicketIcon className={className} />
    case "history":
      return <RecycleIcon className={className} />
    case "locals":
      return <MapPinIcon className={className} />
  }
}

function getLabel(typeButton: SidebarItemType): string {
  switch (typeButton) {
    case "explorer":
      return "Explorar"
    case "saved-items":
      return "Itens Salvos"
    case "coupons":
      return "Cupons"
    case "history":
      return "Histórico"
    case "locals":
      return "Locais"
  }
}

export default function SidebarItem({ typeButton, focused=false, navigate }: SidebarItemProps) {
  return (
    <button
      className={`flex pl-4 pr-4 justify-center sm:justify-start items-center w-full gap-1  ${
        focused ? "text-amber-300" : "text-amber-50"
      } ${
        focused || "hover:text-amber-200"
      } transition-all duration-500`}
      onClick={() => navigate(`/${typeButton}/`)}
    >
      {getIcon(typeButton, "w-10 h-10")}
      < text className="hidden sm:inline text-xl font-bold">{getLabel(typeButton)}</text>
    </button >
  )
}