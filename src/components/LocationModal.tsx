import { XIcon } from "@phosphor-icons/react";
// import { format } from "date-fns";
// import { ptBR } from "date-fns/locale";

interface Props {
  location: any;
  onClose: () => void;
}

export default function LocationModal({ location, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-lg rounded-lg p-5 overflow-y-auto max-h-[80vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-green-700">
            {location.name}
          </h2>
          <button onClick={onClose}>
            <XIcon size={22} />
          </button>
        </div>

        <p className="text-sm text-gray-700">
          <strong>Endereço:</strong> {location.address}
        </p>

        <p className="text-sm text-gray-700 mt-2">
          <strong>Contato:</strong> {location.contact}
        </p>

        {location.prices?.length > 0 && (
          <>
            <h3 className="font-semibold mt-4">
              Preços por categoria
            </h3>

            {location.prices.map((item: any, index: number) => (
              <div
                key={index}
                className="bg-gray-100 rounded-md p-3 mt-3"
              >
                <p className="font-bold">{item.category_name}</p>
                <p className="text-sm">{item.category_description}</p>
                <p className="text-sm">
                  R$ {(item.price_per_kg_cents / 100).toFixed(2)} / kg
                </p>
                <p className="text-xs text-gray-500">
                  Atualizado em{" "}
                  {/* {format(
                    new Date(item.updated_at),
                    "dd 'de' MMMM 'de' yyyy",
                    { locale: ptBR }
                  )} */}
                </p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}