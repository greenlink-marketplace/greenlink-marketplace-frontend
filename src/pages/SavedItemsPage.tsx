import Sidebar from "@components/Sidebar";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@contexts/AuthContext";
import { HomeTabsContext } from "@contexts/HomeTabsContext";
import { useNavigate } from "react-router-dom";
import ProductItem from "@components/ui/ProductItem";
import getSavedProductsList from "@services/marketplace/getSavedProductsList";
import Loader from "@components/ui/Loader";

function SavedItemsPage() {
  const { isVisitor } = useContext(AuthContext)!;
  const { setCurrentScreen } = useContext(HomeTabsContext)!;
  const navigate = useNavigate();

  setCurrentScreen("saved-items")

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [dataProducts, setDataProducts] = useState<ProductPagination[] | null>(null);

  async function tryGetSavedProducts() {
    setIsLoading(true);

    setErrorMessage(null);

    try {
      const responseData = await getSavedProductsList();
      setDataProducts(responseData.map((item: any) => item.product));
    } catch (error: any) {
      if (error?.response) {
        switch (error.response.status) {
          case 401:
            setErrorMessage("Credenciais inválidas");
            break;
          case 403:
            setErrorMessage("Usuário desativado");
            break;
          case 404:
            setErrorMessage("API não encontrada");
            break;
          default:
            setErrorMessage("Erro ao buscar itens salvos");
        }
      } else {
        setErrorMessage("Sem resposta do servidor");
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    tryGetSavedProducts();
  }, [setCurrentScreen]);

  /** Proteção de rota */
  if (isVisitor) return null;

  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <main className="flex-1 bg-gray-100 p-2">
        <div className="p-5">
          {/* Error */}
          {errorMessage && (
            <p className="mt-24 text-center text-lg text-red-600">
              {/* {errorMessage}! :( */}
            </p>
          )}

          {/* Empty */}
          {!errorMessage && dataProducts?.length === 0 && (
            <p className="mt-8 text-center text-xl">
              Nenhum item foi salvo ainda!
            </p>
          )}

          {/* Products */}
          {!errorMessage && dataProducts && dataProducts.length > 0 && (
            <div className="flex flex-wrap justify-evenly gap-5">
              {dataProducts.map((product) => (
                <ProductItem
                  key={product.id}
                  {...product}
                />
              ))}
            </div>
          )}

          {/* Loading */}
          {isLoading && (
            <div className="flex justify-center my-24">
              <Loader />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default SavedItemsPage;