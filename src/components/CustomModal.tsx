import { useEffect, useRef, useState } from "react";

interface CustomModalProps {
  modalVisible: boolean;
  setModalVisible: (v: boolean) => void;

  price_cents: number;
  userCredits: number;

  handleGenerateCoupon: (amount: number) => void;
  isLoadingGenerateCoupon: boolean;
}

export default function CustomModal({
  modalVisible,
  setModalVisible,
  price_cents,
  userCredits,
  handleGenerateCoupon,
  isLoadingGenerateCoupon,
}: CustomModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [creditsToUse, setCreditsToUse] = useState<number>(0);

  const modalRef = useRef<HTMLDivElement>(null);

  // Fecha modal ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setModalVisible(false);
        setStep(1);
        setCreditsToUse(0);
      }
    }

    if (modalVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [modalVisible]);

  const minCredit = Math.round(price_cents * 0.05);
  const maxCredit = Math.round(price_cents * 0.2);

  // Regras de validação
  function checksNotInterchangeability() {
    return (
      creditsToUse <= 0 ||
      creditsToUse > userCredits ||
      creditsToUse < minCredit ||
      creditsToUse > maxCredit
    );
  }

  if (!modalVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 px-4">
      <div
        ref={modalRef}
        className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg animate-fade-in"
      >
        {step === 1 && (
          <>
            <h2 className="text-xl font-semibold mb-4">Trocar Créditos por Cupom</h2>

            <p className="mb-1">
              Preço do Produto:{" "}
              <strong>R$ {(price_cents / 100).toFixed(2).replace(".", ",")}</strong>
            </p>

            <p className="mb-4">Seus Créditos: <strong>{userCredits}</strong></p>

            <input
              type="number"
              value={creditsToUse}
              onChange={(e) => setCreditsToUse(Number(Math.max(0, parseInt(e.target.value) || 0)))}
              placeholder="Quantos créditos deseja usar?"
              className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:ring-2 focus:ring-green-600 outline-none"
            />

            <p className="text-gray-700 mb-4">
              Valor de Desconto:{" "}
              <strong>
                R$ {(creditsToUse / 100).toFixed(2).replace(".", ",")}
              </strong>
            </p>

            <p className="text-sm text-green-700">
              A quantidade deve ser entre{" "}
              <strong>
                R$ {(minCredit / 100).toFixed(2).replace(".", ",")}
              </strong>{" "}
              e{" "}
              <strong>
                R$ {(maxCredit / 100).toFixed(2).replace(".", ",")}
              </strong>.
            </p>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setModalVisible(false)}
                className="text-red-600 font-medium"
              >
                Cancelar
              </button>

              <button
                disabled={checksNotInterchangeability()}
                onClick={() => setStep(2)}
                className={`
                  px-5 py-2 rounded-lg text-white font-medium
                  ${checksNotInterchangeability()
                    ? "bg-green-600/50 cursor-not-allowed"
                    : "bg-green-700 hover:bg-green-800"}
                `}
              >
                Continuar
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-xl font-semibold mb-4">Confirmar Troca</h2>

            <p className="mb-2">
              Você usará <strong>{creditsToUse}</strong> créditos.
            </p>

            <p className="mb-6">
              Desconto aplicado:{" "}
              <strong>
                R$ {(creditsToUse / 100).toFixed(2).replace(".", ",")}
              </strong>
            </p>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep(1)}
                className="text-gray-600 font-medium"
              >
                Voltar
              </button>

              <button
                onClick={() => handleGenerateCoupon(creditsToUse)}
                className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg font-medium flex items-center gap-2"
              >
                {isLoadingGenerateCoupon ? (
                    null
                //   <Loader2 className="animate-spin" size={20} />
                ) : (
                  "Confirmar"
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
