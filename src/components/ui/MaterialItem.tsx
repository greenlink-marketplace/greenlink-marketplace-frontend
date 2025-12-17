function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function MaterialItem({
  name,
  description,
  quantity_gram,
  created_at,
}: Material) {
  const quantityKg = (quantity_gram / 1000).toFixed(2);

  return (
    <div className="bg-gray-200 rounded-lg p-3 mb-3">
      <h3 className="font-bold text-base">{name}</h3>

      <p className="mt-1 text-gray-600">
        {description}
      </p>

      <p className="mt-2 text-gray-700">
        Quantidade: {quantityKg} kg
      </p>

      <p className="text-xs text-gray-500">
        Reciclado em: {formatDate(created_at)}
      </p>
    </div>
  );
}