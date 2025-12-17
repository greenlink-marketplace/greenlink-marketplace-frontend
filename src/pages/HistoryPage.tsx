import Sidebar from "@components/Sidebar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@contexts/AuthContext";
import { HomeTabsContext } from "@contexts/HomeTabsContext";
import MaterialItem from "@components/ui/MaterialItem";
import getMaterialsMy from "@services/recycling/getMaterialsMy";
import Loader from "@components/ui/Loader";

function HistoryPage() {
  const { isVisitor } = useContext(AuthContext)!;
  const { setCurrentScreen } = useContext(HomeTabsContext)!;

  setCurrentScreen("history")

  const [materials, setMaterials] = useState<Material[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleRecycling = async () => {
    setIsLoading(false)

    try {
      const data = await getMaterialsMy();

      if (!Array.isArray(data)) {
        throw new Error("Dados inválidos recebidos da API");
      }

      setMaterials(data);
    } catch (error: any) {
      const handleMessageError = (msg: string) =>
        console.error(msg);

      if (error?.response) {
        if (error.response.status === 401) handleMessageError("Credenciais inválidas");
        else if (error.response.status === 403) handleMessageError("Usuário desativado");
        else if (error.response.status === 404) handleMessageError("API não encontrada");
        else handleMessageError("Requisição feita mas sem sucesso");
      } else if (error?.request) {
        handleMessageError("Sem resposta do servidor");
      } else {
        handleMessageError(`Erro inesperado: ${error?.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleRecycling();
  }, [handleRecycling,]);


  /** Proteção de rota */
  if (isVisitor) return null;

  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <main className="flex-1 bg-gray-100 p-2">
        <div className="p-4 flex-1">
          <h1 className="text-2xl font-bold mb-4">
            Minhas Reciclagens
          </h1>

          {isLoading ? (
            <div className="flex justify-center my-24">
              <Loader />
            </div>
          ) : materials.length === 0 ? (
            <p className="text-center mt-8 text-gray-600">
              Nenhuma reciclagem encontrada.
            </p>
          ) : (
            <div className="space-y-3">
              {materials.map((item) => (
                <MaterialItem
                  key={item.id}
                  {...item}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default HistoryPage;