import ProductImage from "@assets/images/logo.png";
import { Link } from "react-router-dom";

export default function HomePageItem({ id, name, company, price_cents }: Product) {
  return (
    <Link
      to={`/product/${id}/`}
      className="flex items-center gap-4 bg-white shadow rounded-md"
    >
      <img src={ProductImage} className="w-20 h-20 object-contain" />
      <div className="flex flex-col">
        <p className="text-lg font-medium">{name}</p>
        <p className="text-gray-600">{company}</p>
        <p className="text-xl font-semibold text-green-700">
          R$ {price_cents.toFixed(2).replace(".", ",")}
        </p>
      </div>
    </Link>
  );
}
