import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "@contexts/AuthContext";
import { HomeTabsProvider } from "@contexts/HomeTabsContext"
import IndexPage from "@pages/index";
import LoginPage from "@pages/LoginPage";
import RegisterPage from "@pages/RegisterPage";
import ExplorerPage from "@pages/ExplorerPage";
import SavedItemsPage from "@pages/SavedItemsPage";
import CouponsPage from "@pages/CouponsPage";
import HistoryPage from "@pages/HistoryPage";
import LocalsPage from "@pages/LocalsPage";
import NotFoundPage from "@pages/NotFoundPage";
import ProductPage from "@pages/ProductPage";

export default function AppRoutes() {
  const { isVisitor } = useContext(AuthContext)!;

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">
          <HomeTabsProvider>
            <Routes>
              <Route path="/" element={<IndexPage />} />
              <Route path="/explorer/" element={<ExplorerPage />} />
              <Route path="/login/" element={<LoginPage />} />
              <Route path="/register/" element={<RegisterPage />} />
              <Route path="/locals/" element={<LocalsPage />} />
              <Route path="/product/:id/" element={<ProductPage />} />

              {/* Routes user authenticated */}
              {!isVisitor && (
                <>
                  <Route path="/saved-items/" element={<SavedItemsPage />} />
                  <Route path="/coupons/" element={<CouponsPage />} />
                  <Route path="/history/" element={<HistoryPage />} />
                </>
              )}

              {/* Catch-all */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </HomeTabsProvider>
        </main>
      </div>
    </BrowserRouter>
  );
}
