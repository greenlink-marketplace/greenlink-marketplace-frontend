import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";

export default function CouponItem({
  is_valid,
  coupon_code,
  discount_value_cents,
  generated_at,
  product_id
}: Coupon) {
  const [showCode, setShowCode] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={`
        flex justify-between items-start
        rounded-lg p-4 mb-2 border
        ${is_valid ? "border-green-600 opacity-100" : "border-gray-300 opacity-50"}
        bg-white
      `}
    >
      {/* Informações do cupom */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg">
            Código: {showCode ? coupon_code : "**********"}
          </span>

          <button
            disabled={!is_valid}
            onClick={() => setShowCode(!showCode)}
            className="text-gray-600 hover:text-gray-900 transition"
          >
            {showCode ? <EyeSlashIcon size={20} /> : <EyeIcon size={20} />}
          </button>
        </div>

        <p>
          Valor: R$ {(discount_value_cents / 100).toFixed(2).replace(".", ",")}
        </p>

        <p>
          Gerado em:{" "}
          {new Date(generated_at).toLocaleString("pt-BR")}
        </p>

        <p
          className={`font-medium ${is_valid ? "text-green-600" : "text-red-600"
            }`}
        >
          {is_valid ? "Válido" : "Inválido"}
        </p>
      </div>

      {/* Ação */}
      <button
        onClick={() => navigate(`/product/${product_id}/`)}
        className="text-green-700 font-semibold hover:underline"
      >
        Ver Produto
      </button>
    </div>
  );
}