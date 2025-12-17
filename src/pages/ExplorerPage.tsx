import Sidebar from "@components/Sidebar";
import ProductItem from "@components/ui/ProductItem";
import SearchBar from "@components/ui/searchBar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@contexts/AuthContext";
import { HomeTabsContext } from "@contexts/HomeTabsContext";
import getProductList from "@services/marketplace/getProductList"
import getProductSearch from "@services/marketplace/getProductSearch";
import Loader from "@components/ui/Loader";

function ExplorerPage() {
  const { isVisitor } = useContext(AuthContext)!;
  const { setCurrentScreen } = useContext(HomeTabsContext)!;

  const [products, setProducts] = useState<ProductPagination[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [, setUrlNextPage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searching, setSearching] = useState<boolean>(false);

  const [errorMessage, ] = useState<string | null>(null);

  async function searchProduct() {
    setIsLoading(true)
    setProducts([]);

    try {
      const dataResquest = await getProductSearch(searchTerm)

      if (dataResquest.results.length === 0) {
        // handleMessageError("Nenhum produto encontrado", setErrorObj, indexIsError, indexErrorMessage)
        null
      } else {
        setSearching(true)
        setProducts(dataResquest.results);
        setUrlNextPage(dataResquest.next)
      }
    } catch (error: any) {
      if (error.response) {
        // handleMessageError(ERROR_MESSAGES[error.response.status] || ERROR_MESSAGES.DEFAULT, setErrorObj, indexIsError, indexErrorMessage)
      } else if (error.request) {
        // handleMessageError(ERROR_MESSAGES.NO_RESPONSE, setErrorObj, indexIsError, indexErrorMessage)
      } else {
        // handleMessageError(`Erro inesperado: ${error.message}`, setErrorObj, indexIsError, indexErrorMessage)
      }
    }

    setIsLoading(false)
  }

  async function fetchProducts() {
    setIsLoading(true)

    try {
      const dataResquest = await getProductList()

      if (dataResquest.results.length === 0) {
        // handleMessageError("Nenhum produto encontrado", setErrorObj, indexIsError, indexErrorMessage)
        null
      } else {
        if (!searching)
          setProducts(prev => [...prev, ...dataResquest.results]);
        else
          setProducts(dataResquest.results);
        setUrlNextPage(dataResquest.next)
      }
    } catch (error: any) {
      if (error.response) {
        // handleMessageError(ERROR_MESSAGES[error.response.status] || ERROR_MESSAGES.DEFAULT, setErrorObj, indexIsError, indexErrorMessage)
      } else if (error.request) {
        // handleMessageError(ERROR_MESSAGES.NO_RESPONSE, setErrorObj, indexIsError, indexErrorMessage)
      } else {
        // handleMessageError(`Erro inesperado: ${error.message}`, setErrorObj, indexIsError, indexErrorMessage)
      }
    }

    setIsLoading(false)
  }


  // function handleScroll(e: React.UIEvent<HTMLDivElement>) {
    // const target = e.currentTarget;

    // const reachedBottom =
    //   target.scrollHeight - target.scrollTop <= target.clientHeight + 100;

    // if (reachedBottom) {
    //   fetchProducts();
    // }
  // }

  useEffect(() => {
    setCurrentScreen("explorer");
  }, [setCurrentScreen]);

  useEffect(() => {
    if (searchTerm == "")
      fetchProducts();
    else
      searchProduct();
  }, [searchTerm])

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar fixa */}
      <Sidebar />

      {/* Conteúdo principal */}
      <main className="flex-1 bg-gray-100 flex flex-col">
        {/* Área rolável */}
        <div
          className="flex-1 overflow-y-auto p-5"
          // onScroll={handleScroll}
        >
          <SearchBar
            isVisitor={isVisitor}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          {errorMessage ? (
            /* Mensagem de Erro */
            <p className="mt-24 text-center text-lg text-red-600">
              {errorMessage}!
            </p>
          ) : !isLoading && !errorMessage && products.length === 0 ? (
            /* Nenhum Produto Recuperado */
            <p className="mt-8 text-center text-xl">
              Nenhum item encontrado!
            </p>
          ) : !errorMessage && products && products.length > 0 ? (
            /* Produtos */
            <div className="flex flex-wrap justify-evenly gap-5">
              {products.map((product) => (
                <ProductItem key={product.id} {...product} />
              ))}
            </div>
          ) : (
            null
          )}

          {/* Carregando página de produtos*/}
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

export default ExplorerPage;