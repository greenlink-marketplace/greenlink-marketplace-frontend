import { useState, useContext, useEffect } from "react";
import { AuthContext } from "@contexts/AuthContext";
import logoExtend from "@assets/images/LogoVersaoExetendida.png";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext)!;

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [keepConnected, setKeepConnected] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const success = await login(email, pass, keepConnected);

    setLoading(false);

    if (success) {
      navigate("/");
      return;
    }

    setErrorMsg("Credenciais inválidas. Tente novamente.");

  };

  useEffect(() => {
    console.log(keepConnected)
  }, [keepConnected])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="flex flex-col items-center space-y-6">
        <img src={logoExtend} alt="GreenLink Logo" className="h-16 mb-2" />

        <div className="bg-white shadow-md rounded-lg p-8 w-96">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">
            Faça seu Login
          </h2>

          {errorMsg && (
            <p className="text-red-600 text-sm mb-3 text-center">{errorMsg}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100 focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                Senha
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPass(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-100 focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="keepConnected" className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  id="keepConnected"
                  checked={keepConnected}
                  onChange={(e) => setKeepConnected(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-600">
                  Manter-me conectado
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 text-white font-semibold py-2 rounded-md hover:bg-green-800 transition-colors disabled:opacity-50"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
          <p className="text-gray-800 mt-2 text-center text-sm">
            Novo por aqui?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-green-700 cursor-pointer hover:underline"
            >
              Criar conta
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
