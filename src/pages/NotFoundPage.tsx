import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-300 tracking-widest">404</h1>

        <p className="mt-4 text-2xl font-semibold text-gray-700">
          Página não encontrada
        </p>

        <p className="mt-2 text-gray-500 max-w-md">
          A página que você está procurando não existe, foi movida ou está temporariamente indisponível.
        </p>

        <div className="mt-8">
          <Link
            to="/"
            className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors font-medium"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}
