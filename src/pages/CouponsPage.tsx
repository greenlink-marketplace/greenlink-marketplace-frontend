import Sidebar from "@components/Sidebar";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@contexts/AuthContext";
import { HomeTabsContext } from "@contexts/HomeTabsContext";
import CouponItem from "@components/ui/CouponItem"
import getCouponList from "@services/marketplace/getCouponList";
import Loader from "@components/ui/Loader";

function CouponsPage() {
  const { isVisitor } = useContext(AuthContext)!;
  const { setCurrentScreen } = useContext(HomeTabsContext)!;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  setCurrentScreen("coupons")

  const [dataCoupons, setDataCoupons] = useState<Coupon[]>([])

  useEffect(() => {
    handleCoupons()
  }, [])

  // Função reservada para buscar cupons do endpoint
  async function handleCoupons() {
    setIsLoading(true);

    setErrorMessage(null);

    try {
      const responseData = await getCouponList();
      setDataCoupons(responseData);
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
            setErrorMessage("Erro ao buscar cupons");
        }
      } else {
        setErrorMessage("Sem resposta do servidor");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar />

      <main className="flex-1 bg-gray-100 flex flex-row">
        <div className="flex-1 overflow-y-auto p-5">
          <h1 className="text-2xl font-bold mb-4">
            Meus Cupons
          </h1>

          {isLoading ? (
            <div className="flex justify-center my-24">
              <Loader />
            </div>
          ) : dataCoupons.length > 0 ? (
            <div className="space-y-2">
              {dataCoupons.map((coupon) => (
                <CouponItem
                  key={coupon.id}
                  {...coupon}
                />
              ))}
            </div>
          ) : (
            <p className="text-center mt-8 text-gray-600">
              Nenhum cupom encontrado.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default CouponsPage;