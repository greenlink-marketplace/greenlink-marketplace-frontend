import logo from "@assets/images/logo.png";
import SidebarItem from "@components/ui/SidebarItem";
import { useContext } from "react";
import { AuthContext } from "@contexts/AuthContext";
import { HomeTabsContext } from "@contexts/HomeTabsContext";
import { useNavigate } from "react-router-dom";
import { CoinsIcon } from "@phosphor-icons/react"

export default function Sidebar() {
  const { isVisitor, userData } = useContext(AuthContext)!;
  const { currentScreen } = useContext(HomeTabsContext)!;
  const navigate = useNavigate();

  function getSidebarItems() {
    if (isVisitor)
      return ["explorer", "locals"] as SidebarItemType[]

    return ["explorer", "saved-items", "coupons", "history", "locals"] as SidebarItemType[]
  }

  return (
    <aside
      className="
    relative
    flex flex-col justify-center items-center
    bg-green-800
    h-screen
    w-36 sm:w-52 lg:w-64
    transition-all
  "
    >
      {/* Créditos */}
      {userData?.green_credit_balance != null && (
        <div className="absolute top-3 right-3 flex items-center gap-1">
          <CoinsIcon
            size={22}
            weight="duotone"
            className="text-yellow-200"
          />
          <span className="text-sm text-yellow-200 font-medium">
            {userData?.green_credit_balance}
          </span>
        </div>
      )}

      {/* Logo */}
      <div className="w-full h-min flex justify-center">
        <img
          src={logo}
          alt="GreenLink Logo"
          className="h-24"
        />
      </div>

      {/* Navegação */}
      <nav className="w-max">
        {getSidebarItems().map((typeButton, index) => (
          <SidebarItem
            key={index}
            typeButton={typeButton}
            focused={currentScreen === typeButton}
            navigate={navigate}
          />
        ))}
      </nav>
    </aside>
  );
}